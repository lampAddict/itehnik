<?php
/**
 * Created by roman makarov
 * Date: 14.01.2018
 * Time: 16:40
 */

namespace App\Controller;

use Mailgun\Mailgun;
use Mailgun\Messages\Exceptions;
use Mailgun\Constants\ExceptionMessages;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class indexController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('index.html.twig', array('year'=>date('Y')
        ));
    }

    /**
     * @Route("/sendmsg", name="send_message")
     * @Method("POST")
     */
    public function sendMsgAction(Request $request)
    {
        $period = $request->request->get('period');
        $uids = $request->request->get('uids');


        $mgClient = new Mailgun('key-86d4ce2296017d7b00d35cf485055c34');
        $domain = "mg.itehnik.ru";
        try{
            $result = $mgClient->sendMessage($domain, array(
                'from'    => 'email',
                'to'      => 'support@itehnik.ru',
                'subject' => 'Заявка с сайта',
                'text'    => 'comment'
            ));
        }catch( Exceptions\MissingRequiredMIMEParameters $e ){
            $err = $e->getMessage();
        }

        $response['result'] = $result;
        if( isset($err) ){
            $response['error'] = $err;
        }

        return new JsonResponse($response);
    }
}