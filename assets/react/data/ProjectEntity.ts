import EntityInterface from "./EntityInterface";
import ObjectTranslatbleEntity from "./ObjectTranslatbleEntity";
import SkillEntity from "./SkillEntity";

export default interface ProjectEntity extends EntityInterface
{
    id: number,
    name: string,
    description: string,
    images: string[],
    github: string,
    skills: SkillEntity[],
    translations: ObjectTranslatbleEntity[]
}