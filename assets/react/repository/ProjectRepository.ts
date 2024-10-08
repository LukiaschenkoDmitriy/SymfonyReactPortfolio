import ProjectDTO from "@dto/ProjectDTO";

import LanguageEnum from "@enum/LanguageEnum";

import ProjectEntity from "@data/ProjectEntity";
import ObjectTranslatbleEntity from "@data/ObjectTranslatbleEntity";

import AbstractRepository from "./AbstractRepository";

export default class ProjectRepository extends AbstractRepository
{
    constructor() {
        super("projects/$");
    }

    override translateEntity(entity: ProjectEntity, language: LanguageEnum): ProjectEntity {
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

    override async findAll(language: LanguageEnum = LanguageEnum.ENGLISH): Promise<ProjectEntity[]> {
        let endPoint = this.getParsedEndPoint();
        let data = await this.server.getMethod(endPoint, {});

        let results: ProjectEntity[] = [];
        for (let item of data) {
            results.push(this.translateEntity(new ProjectDTO(item), language));;
        }

        return results;
    }

    override async findById(id: number, language: LanguageEnum = LanguageEnum.ENGLISH): Promise<ProjectEntity> {
        let endPoint = this.getParsedEndPoint(id);
        let data = await this.server.getMethod(endPoint, {});

        return this.translateEntity(new ProjectDTO(data), language);
    }
}