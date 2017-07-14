import { TodoTaskModel } from '../shared/todo-task.model';

// Blueprint for the objects we will create

export class TodoCardModel {
     public id         : number;
     public title      : string;
     public headerColor: string;
     public taskArray  : TodoTaskModel[];

     constructor ( id: number,
                   color: string,
                   title?: string,
                   taskArray?: TodoTaskModel[]){

        this.id          = id;
        this.title       = title!== undefined ? title : "Edit category name";
        this.headerColor = color;
        this.taskArray   = taskArray;
     }
}