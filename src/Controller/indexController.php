<?php
/**
 * Created by roman makarov
 * Date: 14.01.2018
 * Time: 16:40
 */

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class indexController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {

        return $this->render('index.html.twig', array(
        ));
    }
}