<?php

namespace App\Service;

use App\Data\ContactData;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailService {
    public function __construct(private MailerInterface $mailerInterface) { }
    
    public function sendMail(ContactData $contactData) {
        $email = (new Email())
            ->from($contactData->email)
            ->to("dmytrii.lukiashchenko@gmail.com")
            ->subject("Portfolio Contact")
            ->text($contactData->name.": ".$contactData->theme)
            ->html(`<h2>$contactData->message</2h>`);

        $this->mailerInterface->send($email);
    }
}