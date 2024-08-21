import ExperienceDTO from "@dto/ExperienceDTO";

import LanguageEnum from "@enum/LanguageEnum";

import ExperienceEntity from "@data/ExperienceEntity";
import ObjectTranslatbleEntity from "@data/ObjectTranslatbleEntity";

import AbstractRepository from "./AbstractRepository";

export default class ExperienceRepository extends AbstractRepository
{
    constructor() {
        super("experiences/$");
    }

    override translateEntity(entity: ExperienceEntity, language: LanguageEnum): ExperienceEntity {
        entity.translations.map((translation: ObjectTranslatbleEntity) => {
            if (translation.lang == language) {
                let copyTranslation = { ...translation };

                translation.lang = "en";
                translation.description = entity.description;
                translation.name = entity.name;

                entity.description = copyTranslation.description;
                entity.name = copyTranslation.name;
            }
        })

        return entity;
    }

    async findAll(language: LanguageEnum = LanguageEnum.ENGLISH): Promise<ExperienceEntity[]> {
        let endPoint = this.getParsedEndPoint();
        let data = await this.server.getMethod(endPoint, {});

        let results: ExperienceEntity[] = [];
        for (let item of data) {
            results.push(this.translateEntity(new ExperienceDTO(item), language));
        }

        return results;

    }

    async findById(id: number, language: LanguageEnum = LanguageEnum.ENGLISH): Promise<ExperienceEntity> {
        let endPoint = this.getParsedEndPoint(id);
        let data = await this.server.getMethod(endPoint, {});

        return this.translateEntity(new ExperienceDTO(data), language);
    }
}