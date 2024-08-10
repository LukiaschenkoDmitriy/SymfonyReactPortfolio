<?php

namespace App\ApiResource;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Random\Engine\Secure;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class RegisterUserController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManagerInterface,
        private UserPasswordHasherInterface $userPasswordHasher
    ) { }

    public function __invoke(User $user): User
    {
        $user->setPassword($this->userPasswordHasher->hashPassword($user, $user->getPassword()));
        $this->entityManagerInterface->persist($user);
        $this->entityManagerInterface->flush();

        return $user;
    }
}