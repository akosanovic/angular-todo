import { TodoTask } from './../todo-task.module';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoTaskService {

    constructor() { }


    taskArray: [TodoTask] = [
        new TodoTask( 1, 'Learn Angular 4', false),
        new TodoTask( 2, 'How to tell which card stores which tasks?', false),
        new TodoTask( 3, 'How to find oldest tasks?', false),
        new TodoTask( 4, 'What is the problem with task group in todo cards?', false),
        new TodoTask( 5, 'Binding to the data property: card & task', false), 
        new TodoTask( 6, 'Create custom directive - event: \'enter pressed \'  ', false),        
    ]

    addNewTask( description:string, checked?: boolean ){
        let id: number              = this.getTaskID();
        let taskDescription: string = description;
        let checkedStatus: boolean  = this.getCheckedStatus(checked);

        let newTask: TodoTask = new TodoTask( id, taskDescription, checkedStatus );
        this.taskArray.unshift( newTask );
    }


    getTaskID():number {
        return this.taskArray.length;
    }


    getCheckedStatus( checked: boolean ): boolean{
        let checkStatus:boolean = checked ? checked : false;
        return checkStatus;
    }
}
