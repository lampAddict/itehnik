<?php


namespace Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\JsonResponse;


class IndexControllerTest extends WebTestCase
{
    public function testIndexPageCreated()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertContains('Манифест', $crawler->filter('#manifest h5')->text());
    }

    public function testSendEmailMessageFromSite()
    {
        $client = static::createClient();

        //get main page content
        $crawler = $client->request('GET', '/');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        //main page survey
        //get middle button on the first step
        $fchoice = $crawler->filter('#step12')->link();
        //click on it
        $crawler = $client->click($fchoice);
        //get third button on the second step
        $schoice = $crawler->filter('#step23')->link();
        //click on it
        $crawler = $client->click($schoice);

        //check if we get feedback form with submit button
        $this->assertContains('Отправить', $crawler->filter('#btnSend')->text());

        $form = $crawler->selectButton('btnSend')->form([], "POST");

        $form['name'] = 'test';
        $form['phone'] = '8 495 562 1445';
        $form['email'] = 'test@test.com';
        //$form['comment'] = 'test comment';

        $client->request($form->getMethod(), 'ajax_message', $form->getPhpValues(), $form->getPhpFiles());
        $response = $client->getResponse();
        if( $response instanceof JsonResponse ){
            $responseData = json_decode($response->getContent());
            $this->assertEquals(true, $responseData->result);
        }
    }
}