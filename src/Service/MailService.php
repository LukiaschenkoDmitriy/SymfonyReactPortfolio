<?php

namespace App\Service;

use App\Data\ContactData;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

/**
 * Service for sending emails related to contact form submissions.
 */
class MailService {
    public function __construct(private MailerInterface $mailerInterface) { }

    /**
     * Sends an email using the provided contact data.
     *
     * @param ContactData $contactData The contact data to include in the email.
     */
    public function sendMail(ContactData $contactData): void {
        $email = (new Email())
            ->from($contactData->email) // Sender's email address
            ->to("dmytrii.lukiashchenko@gmail.com") // Recipient's email address
            ->subject("Portfolio Contact") // Subject of the email
            ->text($contactData->name . ": " . $contactData->theme) // Plain text content
            >html(
                <<<HTML
                <html>
                <body>
                    <h2>Contact Message</h2>
                    <p><strong>Name:</strong> {$contactData->name}</p>
                    <p><strong>Theme:</strong> {$contactData->theme}</p>
                    <p><strong>Message:</strong></p>
                    <p>{$contactData->message}</p>
                </body>
                </html>
                HTML
            );

        $this->mailerInterface->send($email); // Send the email
    }
}
