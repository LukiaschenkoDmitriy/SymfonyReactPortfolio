<?php

namespace App\Tests;

use App\Entity\Router;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RouterEntityTest extends KernelTestCase
{

    public EntityManagerInterface $entityManager;

    protected function setUp(): void
    {
        $this->entityManager = self::bootKernel()->getContainer()->get('doctrine')->getManager();
    }

    /**
     * This function tests the relationship between Router entities.
     * It verifies the parent-child relationship and checks if the parent and child entities are correctly linked.
     *
     * @return void
     */
    public function testEntityName(): void
    {
        // Fetching parent and child entities from the database
        $parent1 = $this->entityManager->getRepository(Router::class)->findOneBy(['name' => 'Parent 1']);
        $child1 = $this->entityManager->getRepository(Router::class)->findOneBy(['name' => 'Child 1']);
        $child2 = $this->entityManager->getRepository(Router::class)->findOneBy(['name' => 'Child 2']);

        // Asserting the parent-child relationship
        $this->assertEquals($parent1, $child1->getParent());
        $this->assertContains($child1, $parent1->getLinks());
        $this->assertContains($child2, $parent1->getLinks());

        // Asserting the parent-child relationship for each entity
        $this->assertEmpty($parent1->getParent());
        $this->assertNotEmpty($child1->getParent());
        $this->assertNotEmpty($child2->getParent());
    }
}
