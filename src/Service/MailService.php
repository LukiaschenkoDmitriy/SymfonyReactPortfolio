<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailService {
    public function __construct(private MailerInterface $mailerInterface) { }
    
    public function sendMail(string $name, string $email, string $theme, string $message) {
        $email = (new Email())
            ->from($email)
            ->to("dmytrii.lukiashchenko@gmail.com")
            ->subject("Portfolio Contact")
            ->text($theme)
            ->html(`<h2>{ $message }</2h>`);

        $this->mailerInterface->send($email);
    }
}