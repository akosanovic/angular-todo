
export class TodoTaskModel {
    public id         : number;
    public description: string;
    public checked    : boolean;


    constructor (id: number, description: string, checked: boolean){
        this.id          = id;
        this.description = description;
        this.checked     = checked;
    }
}