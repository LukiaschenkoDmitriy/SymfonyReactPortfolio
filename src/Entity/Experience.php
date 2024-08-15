<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExperienceRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Attribute\Groups;

// Define the Experience entity and map it to the database using Doctrine ORM
#[ORM\Entity(repositoryClass: ExperienceRepository::class)]
// Define the API resource for this entity
#[ApiResource(
    // Only authenticated users can access this resource
    security: "is_granted('IS_AUTHENTICATED_FULLY')",
    // Define the serialization groups for GET requests
    normalizationContext: ["groups" => ['experience.read']],
    // Define the serialization groups for POST/PUT/PATCH requests
    denormalizationContext: ["groups" => ["experience.write"]]
)]
class Experience
{
    // Define the ID field as primary key and auto-generated
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["experience.read"])]
    private ?int $id = null;

    // Define the name field with a maximum length of 255 characters and nullable
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["experience.read", "experience.write"])]
    private ?string $name = null;

    // Define the description field as TEXT type and nullable
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(["experience.read", "experience.write"])]
    private ?string $description = null;

    // Define the duration field with a maximum length of 255 characters and nullable
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["experience.read", "experience.write"])]
    private ?string $duration = null;

    // Define the company field with a maximum length of 255 characters and nullable
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["experience.read", "experience.write"])]
    private ?string $company = null;

    // Define a many-to-many relationship with Skill entity
    /**
     * @var Collection<int, Skill>
     */
    #[Groups(["experience.read", "experience.write"])]
    #[ORM\ManyToMany(targetEntity: Skill::class, inversedBy: 'experiences')]
    private Collection $skills;

    // Define a many-to-many relationship with Project entity
    /**
     * @var Collection<int, Project>
     */
    #[Groups(["experience.read", "experience.write"])]
    #[ORM\ManyToMany(targetEntity: Project::class, inversedBy: 'experiences')]
    private Collection $projects;

    // Constructor to initialize the skills and projects collections
    public function __construct()
    {
        $this->skills = new ArrayCollection();
        $this->projects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getDuration(): ?string
    {
        return $this->duration;
    }

    public function setDuration(?string $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): static
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, Skill>
     */
    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkill(Skill $skill): static
    {
        if (!$this->skills->contains($skill)) {
            $this->skills->add($skill);
        }

        return $this;
    }

    public function removeSkill(Skill $skill): static
    {
        $this->skills->removeElement($skill);

        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
        }

        return $this;
    }

    public function removeProject(Project $project): static
    {
        $this->projects->removeElement($project);

        return $this;
    }
}
