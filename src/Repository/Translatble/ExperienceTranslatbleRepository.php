<?php

namespace App\Repository\Translatble;

use App\Entity\Translatble\ExperienceTranslatble;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ExperienceTranslatbleRepository extends ServiceEntityRepository {
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExperienceTranslatble::class);
    }
}