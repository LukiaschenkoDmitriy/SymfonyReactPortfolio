import SkillDTO from "@dto/SkillDTO";

import LanguageEnum from "@enum/LanguageEnum";

import SkillEntity from "@data/SkillEntity";
import ObjectTranslatbleEntity from "@data/ObjectTranslatbleEntity";

import AbstractRepository from "./AbstractRepository";

export default class SkillRepository extends AbstractRepository
{
    constructor() {
        super("skills/$");
    }

    override translateEntity(entity: SkillEntity, language: LanguageEnum): SkillEntity {
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

    async findAll(language: LanguageEnum = LanguageEnum.ENGLISH): Promise<SkillEntity[]> {
        let endPoint = this.getParsedEndPoint();
        let data = await this.server.getMethod(endPoint, {});

        let results: SkillEntity[] = [];
        for (let item of data) {
            results.push(this.translateEntity(new SkillDTO(item), language));
        }

        return results;

    }

    async findById(id: number, language: LanguageEnum = LanguageEnum.ENGLISH): Promise<SkillEntity> {
        let endPoint = this.getParsedEndPoint(id);
        let data = await this.server.getMethod(endPoint, {});

        return this.translateEntity(new SkillDTO(data),language);
    }
}