import SkillDTO from "@dto/SkillDTO";
import SkillEntity from "@data/SkillEntity";
import EntityInterface from "@data/EntityInterface";
import AbstractRepository from "./AbstractRepository";

export default class SkillRepository extends AbstractRepository
{
    constructor() {
        super("skills/$");
    }

    async findAll(): Promise<SkillEntity[]> {
        let endPoint = this.getParsedEndPoint();
        let data = await this.server.getMethod(endPoint, {});

        let results: SkillEntity[] = [];
        for (let item of data) {
            results.push(new SkillDTO(item));
        }

        return results;

    }

    async findById(id: number): Promise<SkillEntity> {
        let endPoint = this.getParsedEndPoint(id);
        let data = await this.server.getMethod(endPoint, {});

        return new SkillDTO(data);
    }
}