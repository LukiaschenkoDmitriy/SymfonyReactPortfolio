import LanguageEnum from "@enum/LanguageEnum";

import EntityInterface from "@data/EntityInterface";

export default interface RepositoryInterface {
    apiEndPoint: string

    findById(id: number, language: LanguageEnum): Promise<EntityInterface>;
    findAll(language: LanguageEnum): Promise<EntityInterface[]>;

    translateEntity(entity: EntityInterface, language: LanguageEnum): EntityInterface;
}