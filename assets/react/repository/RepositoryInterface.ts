import EntityInterface from "@data/EntityInterface";

export default interface RepositoryInterface {
    apiEndPoint: string

    findById(id: number): Promise<EntityInterface>;
    findAll(): Promise<EntityInterface[]>;
}