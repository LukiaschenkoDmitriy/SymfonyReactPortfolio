<?php

// This file contains API endpoints for handling authentication and contact form submissions.
// It extends Symfony's AbstractController and uses attributes for routing.

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

use App\Data\ContactData;
use App\Exception\DataWrongException;
use App\Service\GoogleRecaptchaService;
use App\Service\MailService;

class ApiController extends AbstractController {
    // Endpoint for authentication
    #[Route(path:"/api/auth", name:"api_auth", methods:["POST"])]
    public function apiAuth(Request $request): Response {
        // Placeholder for authentication logic
        return new JsonResponse();
    }

    // Endpoint for contact form submissions
    #[Route(path:"/api/contact", name:"api_contact", methods:["POST"])]
    public function apiContact(
        Request $request, 
        MailService $mailService, 
        GoogleRecaptchaService $googleRecaptchaService
    ): Response {
        $data = $request->getContent();
        $content = json_decode($data, true);

        // Verify reCAPTCHA token
        if (!$googleRecaptchaService->verifyCaptcha($content["recaptcha_token"])) {
            return new JsonResponse("Invalid reCAPTCHA.", Response::HTTP_BAD_REQUEST);
        }

        if ($content == null) {
            return new JsonResponse("No data provided.", Response::HTTP_BAD_REQUEST);
        }

        try {
            $contactData = new ContactData($content["contact"]);
        } catch (DataWrongException $e) {
            return new JsonResponse(["message" => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        // Return validation errors if any
        $errors = $contactData->getErrors();
        if (count($errors) != 0) {
            return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);
        }

        // Send contact data via email
        $mailService->sendMail($contactData);
        return new JsonResponse("ok", Response::HTTP_OK);
    }
}
