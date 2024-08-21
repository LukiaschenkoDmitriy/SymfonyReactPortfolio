import ExperienceDTO from "@dto/ExperienceDTO";
import EntityInterface from "@data/EntityInterface";
import AbstractRepository from "./AbstractRepository";
import ExperienceEntity from "@data/ExperienceEntity";

export default class ExperienceRepository extends AbstractRepository
{
    constructor() {
        super("experiences/$");
    }

    async findAll(): Promise<ExperienceEntity[]> {
        let endPoint = this.getParsedEndPoint();
        let data = await this.server.getMethod(endPoint, {});

        let results: ExperienceEntity[] = [];
        for (let item of data) {
            results.push(new ExperienceDTO(item));
        }

        return results;

    }

    async findById(id: number): Promise<ExperienceEntity> {
        let endPoint = this.getParsedEndPoint(id);
        let data = await this.server.getMethod(endPoint, {});

        return new ExperienceDTO(data);
    }
}