<?php

// This class represents an API controller for handling authentication requests.
// It extends Symfony's AbstractController and uses attributes for routing.

namespace App\Controller;

use App\Data\ContactData;
use App\Exception\DataWrongException;
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

        if ($content == null) return new JsonResponse("No data was transferred, or you used the wrong data transfer method.", Response::HTTP_BAD_REQUEST);

        try {
            $contactData = new ContactData($content);
        } catch (DataWrongException $e) {
            return new JsonResponse(["message" => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        $errors = $contactData->getErrors();

        if (count($errors) != 0) return new JsonResponse($errors, Response::HTTP_BAD_REQUEST);

        $mailService->sendMail($contactData);

        return new JsonResponse("ok", Response::HTTP_OK);
    }
}