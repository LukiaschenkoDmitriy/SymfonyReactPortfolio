<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240812224437 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE experience (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, duration VARCHAR(255) DEFAULT NULL, company VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE experience_skill (experience_id INT NOT NULL, skill_id INT NOT NULL, INDEX IDX_3D6F986146E90E27 (experience_id), INDEX IDX_3D6F98615585C142 (skill_id), PRIMARY KEY(experience_id, skill_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE experience_project (experience_id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_6A983B7C46E90E27 (experience_id), INDEX IDX_6A983B7C166D1F9C (project_id), PRIMARY KEY(experience_id, project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE experience_skill ADD CONSTRAINT FK_3D6F986146E90E27 FOREIGN KEY (experience_id) REFERENCES experience (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE experience_skill ADD CONSTRAINT FK_3D6F98615585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE experience_project ADD CONSTRAINT FK_6A983B7C46E90E27 FOREIGN KEY (experience_id) REFERENCES experience (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE experience_project ADD CONSTRAINT FK_6A983B7C166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE experience_skill DROP FOREIGN KEY FK_3D6F986146E90E27');
        $this->addSql('ALTER TABLE experience_skill DROP FOREIGN KEY FK_3D6F98615585C142');
        $this->addSql('ALTER TABLE experience_project DROP FOREIGN KEY FK_6A983B7C46E90E27');
        $this->addSql('ALTER TABLE experience_project DROP FOREIGN KEY FK_6A983B7C166D1F9C');
        $this->addSql('DROP TABLE experience');
        $this->addSql('DROP TABLE experience_skill');
        $this->addSql('DROP TABLE experience_project');
    }
}
