<?php

namespace App\Repository\Translatble;

use App\Entity\Translatble\ProjectTranslatble;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ProjectTranslatbleRepository extends ServiceEntityRepository {
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProjectTranslatble::class);
    }
}