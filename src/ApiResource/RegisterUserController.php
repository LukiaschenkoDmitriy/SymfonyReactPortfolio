<?php

// This class represents a controller for registering new users.
// It is a Symfony controller that uses attributes to mark it as a controller.

namespace App\ApiResource;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class RegisterUserController extends AbstractController
{
    // Constructor to inject dependencies
    public function __construct(
        private EntityManagerInterface $entityManagerInterface,
        private UserPasswordHasherInterface $userPasswordHasher
    ) { }

    // __invoke method to handle the registration process
    // It takes a User entity as input, hashes the password, persists the user, and flushes the changes to the database.
    public function __invoke(User $user): User
    {
        $user->setPassword($this->userPasswordHasher->hashPassword($user, $user->getPassword()));
        $this->entityManagerInterface->persist($user);
        $this->entityManagerInterface->flush();

        return $user;
    }
}