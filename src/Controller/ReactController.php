<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ReactController extends AbstractController
{
    #[Route("/{path}", name: "app_react_index", methods: ["GET"], requirements: ["path" => "^(?!api\/).*"])]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}