<?php

namespace App\DataFixtures;

use App\Entity\Translatble\ProjectTranslatble;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Project;
use App\Entity\Skill;
use App\Entity\Experience;

class ProjectFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        
    }
}