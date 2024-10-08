<?php

namespace App\Entity;

use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\ApiResource\TestProjectController;
use App\Entity\Translatble\ProjectTranslatble;
use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Attribute\Groups;

// Define the Project entity and map it to the database using Doctrine ORM
#[ApiResource(
    // Only authenticated users can access this resource
    security: "is_granted('IS_AUTHENTICATED_FULLY')",
    // Define the serialization groups for GET requests
    normalizationContext: ["groups" => ['project.read']],
    // Define the serialization groups for POST/PUT/PATCH requests
    denormalizationContext: ["groups" => ["project.write"]]
)]
#[ORM\Entity(repositoryClass: ProjectRepository::class)]
class Project
{
    // Define the ID field as primary key and auto-generated
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["project.read", "skill.read", "experience.read"])]
    private ?int $id = null;

    // Define the name field with a maximum length of 255 characters and nullable
    #[Groups(["project.read", "project.write", "skill.read", "experience.read"])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    // Define the description field as TEXT type and nullable
    #[Groups(["project.read", "project.write", "skill.read", "experience.read"])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    // Define the images field as an array of strings and nullable
    #[Groups(["project.read", "project.write", "skill.read", "experience.read"])]
    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private ?array $images = null;

    // Define the github field with a maximum length of 999 characters and nullable
    #[Groups(["project.read", "project.write", "skill.read", "experience.read"])]
    #[ORM\Column(length: 999, nullable: true)]
    private ?string $github = null;

    // Define a many-to-many relationship with Skill entity
    /**
     * @var Collection<int, Skill>
     */
    #[Groups(["project.read", "project.write"])]
    #[ORM\ManyToMany(targetEntity: Skill::class, inversedBy: 'projects', cascade: ["persist"])]
    private Collection $skills;

    // Define a many-to-many relationship with Experience entity
    /**
     * @var Collection<int, Experience>
     */
    #[ORM\ManyToMany(targetEntity: Experience::class, mappedBy: 'projects')]
    private Collection $experiences;

    #[ORM\OneToMany(targetEntity: ProjectTranslatble::class, mappedBy:"object", cascade:["remove", "persist", "refresh"])]
    #[Groups(["project.read", "project.write", "skill.read", "experience.read"])]
    private Collection $translations;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["project.read", "project.write", "skill.read", "experience.read"])]
    private ?string $icon = null;

    // Constructor to initialize the skills and experiences collections
    public function __construct()
    {
        $this->skills = new ArrayCollection();
        $this->experiences = new ArrayCollection();
        $this->translations = new ArrayCollection();
    }

    public function setTranslations(array $translations): static
    {
        $this->translations = new ArrayCollection();

        foreach ($translations as $translation) {
            $this->addTranslation($translation);
        }

        return $this;
    }

    public function getTranslations(): Collection
    {
        return $this->translations;
    }

    public function addTranslation(ProjectTranslatble $translate): static
    {
        if (!$this->translations->contains($translate)) {
            $this->translations->add($translate);
            $translate->setObject($this);
        }

        return $this;
    }

    public function removeTranslation(ProjectTranslatble $translation): self
    {
        if ($this->translations->removeElement($translation)) {
            // set the owning side to null (unless already changed)
            if ($translation->getObject() === $this) {
                $translation->setObject(null);
            }
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

    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(?array $images): static
    {
        $this->images = $images;

        return $this;
    }

    public function getGithub(): ?string
    {
        return $this->github;
    }

    public function setGithub(?string $github): static
    {
        $this->github = $github;

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
            $experience->addProject($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experiences->removeElement($experience)) {
            $experience->removeProject($this);
        }

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
}
