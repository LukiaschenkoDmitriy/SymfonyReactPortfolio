import APIService from "@api/APIService";

import LanguageEnum from "@enum/LanguageEnum";

import EntityInterface from "@data/EntityInterface";

import RepositoryInterface from "./RepositoryInterface";

export default abstract class AbstractRepository implements RepositoryInterface {
    protected server: APIService;
    apiEndPoint: string;

    constructor(apiEndPoint: string) {
        this.server = new APIService();
        this.apiEndPoint = apiEndPoint;
    }

    abstract findAll(language: LanguageEnum): Promise<EntityInterface[]>;
    abstract findById(id: number, language: LanguageEnum): Promise<EntityInterface>;
    abstract translateEntity(entity: EntityInterface, language: LanguageEnum): EntityInterface;

    public getParsedEndPoint(id: number | undefined = undefined): string {
        let apiEndPoint = this.apiEndPoint;
        return (id == undefined) ? apiEndPoint.replace("/$", "") : apiEndPoint.replace("$", id.toString());
    }
}