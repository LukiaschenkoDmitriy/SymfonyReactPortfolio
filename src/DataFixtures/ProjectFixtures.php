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
        // Create some skills
        $skill1 = new Skill();
        $skill1->setName('PHP');
        $manager->persist($skill1);

        $skill2 = new Skill();
        $skill2->setName('Symfony');
        $manager->persist($skill2);

        // Create some experiences
        $experience1 = new Experience();
        $experience1->setName('Web Developer');
        $manager->persist($experience1);

        $experience2 = new Experience();
        $experience2->setName('Software Engineer');
        $manager->persist($experience2);

        // Create a project and associate it with skills and experiences
        $project = new Project();
        $project->setName('My Project');
        $project->setDescription('This is a sample project.');
        $project->setImages(['image1.jpg', 'image2.jpg']);
        $project->setGithub('https://github.com/myproject');

        $project->addTranslation((new ProjectTranslatble())->setLang("de")->setName("MYPROJECT")->setDescription("THISISSAMPLEPROJECT"));

        $project->addSkill($skill1);
        $project->addSkill($skill2);

        $project->addExperience($experience1);
        $project->addExperience($experience2);

        $manager->persist($project);

        $manager->flush();
    }
}