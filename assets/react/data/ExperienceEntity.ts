import EntityInterface from "./EntityInterface";
import ObjectTranslatbleEntity from "./ObjectTranslatbleEntity";
import ProjectEntity from "./ProjectEntity";
import SkillEntity from "./SkillEntity";

export default interface ExperienceEntity extends EntityInterface
{
    id: number,
    name: string,
    description: string,
    duration: string,
    company: string,
    skills: SkillEntity[],
    projects: ProjectEntity[],
    translations: ObjectTranslatbleEntity[]
}