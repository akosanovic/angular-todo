import { TodoTask } from './../todo-task.module';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class MainCardService implements OnInit{

    taskArray: TodoTask[] = [
        new TodoTask( 1, 'Learn Angular 4', false),
        new TodoTask( 2, 'How to tell which card stores which tasks?', false),
        new TodoTask( 3, 'How to find oldest tasks?', false),
        new TodoTask( 3, 'How to find oldest tasks?', false)
    ]

    oldestTaskArray: TodoTask[] = this.taskArray;

    constructor() { }

    ngOnInit (){ }

    getTasks( todoTasks: TodoTask ){
        this.taskArray.push(todoTasks);
    }
    removeTasks( todoTask: TodoTask ){
        for (let i = 0; i < this.taskArray.length; i++){
            if (this.taskArray[i] === todoTask){
                this.taskArray.splice( i, 1 );
            }
        }
        // if the task is removed from main-card service remove it in the todo card where 
        // it's positioned
    }

}
