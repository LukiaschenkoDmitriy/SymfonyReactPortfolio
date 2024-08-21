import EntityInterface from "./EntityInterface";
import ObjectTranslatbleEntity from "./ObjectTranslatbleEntity";
import ProjectEntity from "./ProjectEntity";

export default interface SkillEntity extends EntityInterface
{
    id: number,
    name: string,
    description: string,
    points: number
    image: string,
    icon: string,
    projects: ProjectEntity[],
    translations: ObjectTranslatbleEntity[]
}