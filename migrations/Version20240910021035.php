<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240910021035 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE skill_subskills DROP FOREIGN KEY FK_E0BCA50869257BE8');
        $this->addSql('ALTER TABLE skill_subskills DROP FOREIGN KEY FK_E0BCA50870C02B67');
        $this->addSql('DROP TABLE skill_subskills');
        $this->addSql('ALTER TABLE skill ADD sub_skill_ids LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE skill_subskills (skill_source INT NOT NULL, skill_target INT NOT NULL, INDEX IDX_E0BCA50870C02B67 (skill_source), INDEX IDX_E0BCA50869257BE8 (skill_target), PRIMARY KEY(skill_source, skill_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE skill_subskills ADD CONSTRAINT FK_E0BCA50869257BE8 FOREIGN KEY (skill_target) REFERENCES skill (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE skill_subskills ADD CONSTRAINT FK_E0BCA50870C02B67 FOREIGN KEY (skill_source) REFERENCES skill (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE skill DROP sub_skill_ids');
    }
}
