import ProjectDTO from "@dto/ProjectDTO";
import ProjectEntity from "@data/ProjectEntity";
import EntityInterface from "@data/EntityInterface";
import AbstractRepository from "./AbstractRepository";

export default class ProjectRepository extends AbstractRepository
{
    constructor() {
        super("projects/$");
    }

    async findAll(): Promise<ProjectEntity[]> {
        let endPoint = this.getParsedEndPoint();
        let data = await this.server.getMethod(endPoint, {});

        let results: ProjectEntity[] = [];
        for (let item of data) {
            results.push(new ProjectDTO(item));
        }

        return results;

    }

    async findById(id: number): Promise<ProjectEntity> {
        let endPoint = this.getParsedEndPoint(id);
        let data = await this.server.getMethod(endPoint, {});

        return new ProjectDTO(data);
    }
}