import SkillEntity from "@data/SkillEntity";
import ProjectEntity from "@data/ProjectEntity";
import ExperienceEntity from "@data/ExperienceEntity";
import ObjectTranslatbleEntity from "@data/ObjectTranslatbleEntity";

import SkillDTO from "./SkillDTO";
import ProjectDTO from "./ProjectDTO";
import ObjectTranslatbleDTO from "./ObjectTranslatbleDTO";

export default class ExperienceDTO implements ExperienceEntity {
    id: number;
    name: string;
    description: string;
    duration: string;
    role: string;
    company: string;
    skills: SkillEntity[];
    projects: ProjectEntity[];
    translations: ObjectTranslatbleEntity[];

    constructor(ExperienceEntity: any) {
        try {
            this.id = ExperienceEntity.id;
            this.name = ExperienceEntity.name;
            this.description = ExperienceEntity.description;
            this.duration = ExperienceEntity.duration;
            this.company = ExperienceEntity.company;
            this.role = ExperienceEntity.role;

            this.skills = [];
            this.projects = [];
            this.translations = [];

            if (ExperienceEntity.skills) {
                ExperienceEntity.skills.forEach((skill: any) => this.skills.push(new SkillDTO(skill)));
            }

            if (ExperienceEntity.projects) {
                ExperienceEntity.projects.forEach((project: any) => this.projects.push(new ProjectDTO(project)));
            }

            if (ExperienceEntity.translations) {
                ExperienceEntity.translations.forEach((translation: any) => this.translations.push(new ObjectTranslatbleDTO(translation)));
            }
        } catch {
            throw new Error("DTO error of the Experience entity");
        }
    }
}