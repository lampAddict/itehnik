<?php


namespace Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


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
        $this->assertContains('Отправить', $crawler->filter('#btnSend:not(.mfp-hide)')->text());

        $btn = $crawler->selectButton('btnSend');
        
        //click on it
        //$crawler = $client->click($btn);
    }
}