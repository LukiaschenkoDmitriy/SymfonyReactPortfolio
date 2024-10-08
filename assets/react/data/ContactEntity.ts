import EntityInterface from "./EntityInterface";

export default interface ContactEntity extends EntityInterface
{
    name: string,
    email: string,
    theme: string,
    message: string
}