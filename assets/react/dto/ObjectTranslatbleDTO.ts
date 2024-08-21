import ObjectTranslatbleEntity from "@data/ObjectTranslatbleEntity";

export default class ObjectTranslatbleDTO implements ObjectTranslatbleEntity {
    
    id: number;
    name: string;
    description: string;
    lang: string;

    constructor(ObjectTranslatbleEntity: any) {
        try {
            this.id = ObjectTranslatbleEntity.id;
            this.name = ObjectTranslatbleEntity.name;
            this.description = ObjectTranslatbleEntity.description;
            this.lang = ObjectTranslatbleEntity.lang;
        } catch {
            throw new Error("DTO error of the ObjectTranslatble entity");
        }
    }
}