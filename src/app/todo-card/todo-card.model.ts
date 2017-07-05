import { TodoTask } from '../shared/todo-task.module';

// Blueprint for the objects we will create

export class TodoCard {
     public id         : number;
     public title      : string;
     public headerColor: string;
     public taskArray  : TodoTask[];

     constructor ( id: number,
                   color: string,
                   title?: string,
                   taskArray?: TodoTask[]){

        this.id          = id;
        this.title       = title!== undefined ? title : "Edit category name";
        this.headerColor = color;
        this.taskArray   = taskArray;
     }
}