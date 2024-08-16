<?php

namespace App\Entity\Translatble;

use App\Entity\Experience;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\Translatble\ExperienceTranslatbleRepository;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ExperienceTranslatbleRepository::class)]
class ExperienceTranslatble extends AbstractEntityTranslatble
{
    #[ORM\Column(length: 255, nullable: false)]
    #[Groups(["experience.read", "experience.write"])]
    private string $name = "";

    #[ORM\Column(type: Types::TEXT, nullable: false)]
    #[Groups(["experience.read", "experience.write"])]
    private string $description = "";

    #[ORM\ManyToOne(targetEntity: Experience::class, inversedBy: "translations")]
    private Experience $object;

    public function getObject(): Experience
    {
        return $this->object;
    }

    public function setObject(Experience $object): static
    {
        $this->object = $object;

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