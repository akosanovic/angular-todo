import { TodoTask } from './../todo-task/todo-task.module';

// Blueprint for the objects we will create

export class TodoCard {
     public id       : number;
     public name     : string;
     public taskArray: TodoTask[];

     constructor ( id: number, name: string, taskArray?: TodoTask[] ){
        this.id        = id;
        this.name      = name;
        this.taskArray = taskArray;
     }

}