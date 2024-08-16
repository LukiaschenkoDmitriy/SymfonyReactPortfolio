<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Translatble\SkillTranslatble;
use App\Repository\SkillRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

// Define the Skill entity and map it to the database using Doctrine ORM
#[ApiResource(
    // Only authenticated users can access this resource
    security: "is_granted('IS_AUTHENTICATED_FULLY')",
    // Define the serialization groups for GET requests
    normalizationContext: ["groups" => ['skill.read']],
    // Define the serialization groups for POST/PUT/PATCH requests
    denormalizationContext: ["groups" => ["skill.write"]]
)]
#[ORM\Entity(repositoryClass: SkillRepository::class)]
class Skill
{
    // Define the ID field as primary key and auto-generated
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["project.read", "skill.read", "experience.read"])]
    private ?int $id = null;

    // Define the name field with a maximum length of 255 characters and nullable
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["project.read", "skill.read", "skill.write", "experience.read"])]
    private ?string $name = null;

    // Define the description field as TEXT type and nullable
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(["project.read", "skill.read", "skill.write", "experience.read"])]
    private ?string $description = null;

    // Define the points field as an integer and nullable
    #[ORM\Column(nullable: true)]
    #[Groups(["project.read", "skill.read", "skill.write", "experience.read"])]
    private ?int $points = null;

    // Define the image field with a maximum length of 999 characters and nullable
    #[ORM\Column(length: 999, nullable: true)]
    #[Groups(["project.read", "skill.read", "skill.write", "experience.read"])]
    private ?string $image = null;

    // Define the icon field with a maximum length of 999 characters and nullable
    #[ORM\Column(length: 999, nullable: true)]
    #[Groups(["project.read", "skill.read", "skill.write", "experience.read"])]
    private ?string $icon = null;

    // Define a many-to-many relationship with Project entity
    /**
     * @var Collection<int, Project>
     */
    #[ORM\ManyToMany(targetEntity: Project::class, mappedBy: 'skills', cascade: ["persist"])]
    #[Groups(["skill.read", "skill.write"])]
    private Collection $projects;

    // Define a many-to-many relationship with Experience entity
    /**
     * @var Collection<int, Experience>
     */
    #[ORM\ManyToMany(targetEntity: Experience::class, mappedBy: 'skills')]
    private Collection $experiences;

    #[ORM\OneToMany(targetEntity: SkillTranslatble::class, mappedBy:"object", cascade:["remove", "persist"])]
    #[Groups(["project.read", "skill.read", "skill.write", "experience.read"])]
    private Collection $translations;

    // Constructor to initialize the projects and experiences collections
    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->experiences = new ArrayCollection();
        $this->translations = new ArrayCollection();
    }

    public function getTranslations(): Collection
    {
        return $this->translations;
    }

    public function setTranslations(array $translations): static
    {
        $this->translations = new ArrayCollection();

        foreach ($translations as $translation) {
            $this->addTranslation($translation);
        }

        return $this;
    }

    public function addTranslation(SkillTranslatble $translate): static
    {
        if (!$this->translations->contains($translate)) {
            $this->translations->add($translate);
            $translate->setObject($this);
        }

        return $this;
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

    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(?int $points): static
    {
        $this->points = $points;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): static
    {
        $this->icon = $icon;

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
            $project->addSkill($this);
        }

        return $this;
    }

    public function removeProject(Project $project): static
    {
        if ($this->projects->removeElement($project)) {
            $project->removeSkill($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experience $experience): static
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences->add($experience);
            $experience->addSkill($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experiences->removeElement($experience)) {
            $experience->removeSkill($this);
        }

        return $this;
    }
}
