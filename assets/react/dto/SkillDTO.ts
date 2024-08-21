import SkillEntity from "@data/SkillEntity";
import ProjectEntity from "@data/ProjectEntity";
import ObjectTranslatbleEntity from "@data/ObjectTranslatbleEntity";

import ProjectDTO from "./ProjectDTO";
import ObjectTranslatbleDTO from "./ObjectTranslatbleDTO";

export default class SkillDTO implements SkillEntity {
    id: number;
    name: string;
    description: string;
    points: number;
    image: string;
    icon: string;
    projects: ProjectEntity[];
    translations: ObjectTranslatbleEntity[];

    constructor(SkillEntity: any) {
        try {
            this.id = SkillEntity.id;
            this.name = SkillEntity.name;
            this.description = SkillEntity.description;
            this.points = SkillEntity.points;
            this.image = SkillEntity.image;
            this.icon = SkillEntity.icon;
            
            this.projects = [];
            this.translations = [];

            if (SkillEntity.projects) {
                SkillEntity.projects.forEach((project: any) => this.projects.push(new ProjectDTO(project)));
            }

            if (SkillEntity.translations) {
                SkillEntity.translations.forEach((translation: any) => this.translations.push(new ObjectTranslatbleDTO(translation)));
            }
        } catch {
            throw new Error("DTO error of the Skill entity");
        }
    }
}