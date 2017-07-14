

import { TodoTaskModel } from './../todo-task.model';

import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class MainCardService implements OnInit{

    taskArray: TodoTaskModel[] = []

    oldestTaskArray: TodoTaskModel [] = this.taskArray;

    constructor() { }

    ngOnInit (){
       
     }

    getTasks( todoTasks: TodoTaskModel ){        
        this.taskArray.push(todoTasks);
    }
    
    removeTasks( todoTask: TodoTaskModel ){
        
        for (let i = 0; i < this.taskArray.length; i++){
            if (this.taskArray[i] === todoTask){
                this.taskArray.splice( i, 1 );
            }
        }
        // if the task is removed from main-card service remove it in the todo card where 
        // it's positioned
    }

}
