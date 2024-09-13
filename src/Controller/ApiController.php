<?php

// This class represents an API controller for handling authentication requests.
// It extends Symfony's AbstractController and uses attributes for routing.

namespace App\Controller;

use App\Service\MailService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiController extends AbstractController {
    // Route annotation for the /api/auth endpoint
    // The endpoint accepts POST requests and is named "api_auth"
    #[Route(path:"/api/auth", name:"api_auth", methods:["POST"])]
    public function apiAuth(Request $request):Response {
        // Placeholder for authentication logic
        // Currently, it returns an empty JsonResponse
        return new JsonResponse();
    }

    #[Route(path:"/api/contact", name:"api_contact", methods:["POST"])]
    public function apiContact(Request $request, MailService $mailService):Response {
        
        $data = $request->getContent();
        $content = json_decode($data, true);

        $requiredFields = [
            'name' => 'Name is required',
            'email' => 'Email is required',
            'theme' => 'Theme is required',
            'message' => 'Message is required',
        ];
        
        foreach ($requiredFields as $field => $errorMessage) {
            if (!array_key_exists($field, $content)) {
                return new JsonResponse([$field => "required"], Response::HTTP_BAD_REQUEST);
            }
        }

        $errors = [];

        if (strlen($content["name"]) == 0) $errors["name"] = "wrong";
        if (!filter_var($content["email"], FILTER_VALIDATE_EMAIL)) $errors["email"] = "wrong";
        if (strlen($content["theme"]) == 0) $errors["theme"] = "wrong";
        if (strlen($content["message"]) == 0) $errors["message"] = "wrong";

        if (count($errors) != 0) return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);

        $mailService->sendMail($content["name"], $content["email"], $content["theme"], $content["message"]);

        return new JsonResponse("ok", Response::HTTP_OK);
    }
}