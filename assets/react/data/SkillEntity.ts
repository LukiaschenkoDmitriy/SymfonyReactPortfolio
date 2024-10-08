import ProjectEntity from "./ProjectEntity";
import EntityInterface from "./EntityInterface";
import ObjectTranslatbleEntity from "./ObjectTranslatbleEntity";

export default interface SkillEntity extends EntityInterface
{
    id: number,
    name: string,
    description: string,
    points: number
    image: string,
    icon: string,
    projects: ProjectEntity[],
    translations: ObjectTranslatbleEntity[],
    subSkillIds: string[]
}