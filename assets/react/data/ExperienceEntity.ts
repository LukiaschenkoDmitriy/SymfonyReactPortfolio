import SkillEntity from "./SkillEntity";
import ProjectEntity from "./ProjectEntity";
import EntityInterface from "./EntityInterface";
import ObjectTranslatbleEntity from "./ObjectTranslatbleEntity";

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