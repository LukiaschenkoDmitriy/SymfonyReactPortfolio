<?php

// This class represents a controller for handling React routing.
// It extends Symfony's AbstractController and uses attributes for routing.

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ReactController extends AbstractController
{
    // Route annotation for the root ("/") and any path not starting with "api/"
    // The endpoint accepts GET requests and is named "app_react_index"
    #[Route("/{path}", name: "app_react_index", methods: ["GET"], requirements: ["path" => "^(?!api\/).*"])]
    public function index(): Response
    {
        // Renders the base.html.twig template
        // This template is used for serving the React application
        return $this->render('base.html.twig');
    }
}