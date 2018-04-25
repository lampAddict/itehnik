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

class IndexController extends Controller
{
    /**
     * @Route("/" name="index")
     */
    public function IndexAction()
    {
        return $this->render('index.html.twig', array('year'=>date('Y')
        ));
    }

    /**
     * @Route("/ajax_message" name="ajax_message")
     * @Method("POST")
     */
    public function sendMsgAction(Request $request)
    {
        $name = $request->request->get('name');
        $phone = $request->request->get('phone');
        $email = $request->request->get('email');
        $comment = $request->request->get('comment');

        $err = '';
        $error_elements = [];
        if( $name == '' ){
            $err .= "поле 'Имя' не заполнено, ";
            $error_elements[] = "pname";
        }

        if( $phone == '' ){
            $err .= "поле 'Телефон' не заполнено, ";
            $error_elements[] = "phone";
        }

        if( $email == '' ){
            $err .= "поле 'Адрес электронной почты' не заполнено, ";
            $error_elements[] = "email";
        }

        if( $comment == '' ){
            $err .= "поле 'Комментарий' не заполнено, ";
            $error_elements[] = "comment";
        }

        if( strlen($err) > 0 ){
            $err = rtrim($err, ", ");
            return new JsonResponse(["error"=>$err, "error_elements"=>$error_elements, "result"=>false]);
        }

        $mgClient = new Mailgun('key');
        $domain = "mg.itehnik.ru";
        try{
            $result = $mgClient->sendMessage($domain, array(
                'from'    => $email,
                'to'      => 'support@itehnik.ru',
                'subject' => 'Заявка с сайта',
                'text'    => $name . "\n\n" . $phone . "\n\n" . $comment
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