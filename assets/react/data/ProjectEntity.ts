import SkillEntity from "./SkillEntity";
import EntityInterface from "./EntityInterface";
import ObjectTranslatbleEntity from "./ObjectTranslatbleEntity";

export default interface ProjectEntity extends EntityInterface
{
    id: number,
    name: string,
    description: string,
    images: string[],
    icon: string,
    github: string,
    skills: SkillEntity[],
    translations: ObjectTranslatbleEntity[]
}