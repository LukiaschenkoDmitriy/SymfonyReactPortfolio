<?php

namespace App\Entity\Translatble;

use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Skill;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\Translatble\SkillTranslatbleRepository;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: SkillTranslatbleRepository::class)]
#[ApiResource(
    security: "is_granted('IS_AUTHENTICATED_FULLY')",
    operations: [
        new GetCollection(security: "is_granted('PUBLIC_ACCESS')"),
        new Get(security: "is_granted('PUBLIC_ACCESS')"),
        new Post(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Put(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Patch(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Delete(security: "is_granted('IS_AUTHENTICATED_FULLY')")
    ]
)]
class SkillTranslatble extends AbstractEntityTranslatble
{
    #[ORM\Column(length: 255, nullable: false)]
    #[Groups(["project.read", "skill.read", "skill.write", "experience.read"])]
    private string $name = "";

    #[ORM\Column(type: Types::TEXT, nullable: false)]
    #[Groups(["project.read", "skill.read", "skill.write", "experience.read"])]
    private string $description = "";

    #[ORM\ManyToOne(targetEntity: Skill::class, inversedBy: "translations")]
    private Skill $object;

    public function getObject(): Skill
    {
        return $this->object;
    }

    public function setObject(Skill $object): static
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