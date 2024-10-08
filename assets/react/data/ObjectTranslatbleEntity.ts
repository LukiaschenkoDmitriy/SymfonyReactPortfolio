import EntityInterface from "./EntityInterface";

export default interface ObjectTranslatbleEntity extends EntityInterface
{
    id: number,
    name: string,
    description: string,
    lang: string
}