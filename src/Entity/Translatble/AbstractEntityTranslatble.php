<?php

namespace App\Entity\Translatble;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\MappedSuperclass]
abstract class AbstractEntityTranslatble {
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["experience.read", "skill.read", "project.read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["experience.read", "experience.write","skill.read", "skill.write","project.read", "project.write"])]
    private ?string $lang = null;

    public function getId():?int
    {
        return $this->id;
    }

    public function getLang():?string
    {
        return $this->lang;
    }

    public function setLang(?string $lang): static
    {
        $this->lang = $lang;

        return $this;
    }
}