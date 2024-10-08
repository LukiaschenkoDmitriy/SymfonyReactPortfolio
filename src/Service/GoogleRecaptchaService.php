<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

/**
 * Service for verifying Google reCAPTCHA tokens.
 */
class GoogleRecaptchaService {
    // Secret key for reCAPTCHA verification
    public function __construct(private $secret_key) { }

    /**
     * Verifies the reCAPTCHA token.
     *
     * @param string $recaptchaToken The token received from the reCAPTCHA widget.
     * @return bool True if verification is successful and score is acceptable; otherwise, false.
     */
    public function verifyCaptcha(string $recaptchaToken): bool {
        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = [
            'secret' => $this->secret_key,
            'response' => $recaptchaToken,
            'remoteip' => $_SERVER['REMOTE_ADDR']
        ];
    
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ],
        ];
        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        $result = json_decode($response);
    
        // Check if reCAPTCHA verification was successful and score meets threshold
        return $result->success && $result->score >= 0.5;
    }
}
