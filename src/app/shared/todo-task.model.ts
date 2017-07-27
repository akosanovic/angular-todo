
export class TodoTaskModel {
    public id         : number;
    public cardId     : number;
    public description: string;
    public checked    : boolean;


    constructor (id: number, cardId:number, description: string, checked: boolean){
        this.id          = id;
        this.cardId      = cardId;
        this.description = description;
        this.checked     = checked;
    }
}