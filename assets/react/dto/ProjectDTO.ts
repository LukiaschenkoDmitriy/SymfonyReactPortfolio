import SkillDTO from "./SkillDTO";
import SkillEntity from "@data/SkillEntity";
import ProjectEntity from "@data/ProjectEntity";
import ObjectTranslatbleDTO from "./ObjectTranslatbleDTO";
import ObjectTranslatbleEntity from "@data/ObjectTranslatbleEntity";

export default class ProjectDTO implements ProjectEntity {
    id: number;
    name: string;
    description: string;
    images: string[];
    github: string;
    skills: SkillEntity[];
    translations: ObjectTranslatbleEntity[];

    constructor(ProjectEntity: any) {
        try {
            this.id = ProjectEntity.id;
            this.name = ProjectEntity.name;
            this.description = ProjectEntity.description;
            this.images = ProjectEntity.images;
            this.github = ProjectEntity.github;

            this.skills = [];
            this.translations = [];

            if (ProjectEntity.skills) {
                ProjectEntity.skills.forEach((skill: any) => this.skills.push(new SkillDTO(skill)));
            }

            if (ProjectEntity.translations) {
                ProjectEntity.translations.forEach((translation: any) => this.translations.push(new ObjectTranslatbleDTO(translation)));
            }
        } catch {
            throw new Error("DTO error of the Project entity");
        }
    }
}