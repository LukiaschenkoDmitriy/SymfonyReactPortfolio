<?php

namespace App\Entity\Translatble;

use App\Entity\Project;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\Translatble\ProjectTranslatbleRepository;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ProjectTranslatbleRepository::class)]
class ProjectTranslatble extends AbstractEntityTranslatble
{
    #[ORM\Column(length: 255, nullable: false)]
    #[Groups(["project.read", "project.write", "skill.read", "experience.read"])]
    private string $name = "";

    #[ORM\Column(type: Types::TEXT, nullable: false)]
    #[Groups(["project.read", "project.write", "skill.read", "experience.read"])]
    private string $description = "";

    #[ORM\ManyToOne(targetEntity: Project::class, inversedBy: "translations")]
    private ?Project $object;

    public function getObject(): ?Project
    {
        return $this->object;
    }

    public function setObject(?Project $object): static
    {
        $this->object = $object;
        $object->addTranslation($this);

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }
}