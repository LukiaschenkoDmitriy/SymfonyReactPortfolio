<?php

namespace App\Repository\Translatble;

use App\Entity\Translatble\SkillTranslatble;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class SkillTranslatbleRepository extends ServiceEntityRepository {
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SkillTranslatble::class);
    }
}