import { TodoCardsService } from './todo-cards.service';
import { TodoTaskModel } from './../todo-task.model';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/Rx';


@Injectable()
export class MainCardService {

    taskArray: TodoTaskModel[] = [
        new TodoTaskModel(1, "Testing Task", false),
    ]

    oldestTaskArray: TodoTaskModel [] = [
        new TodoTaskModel(1, "Testing Task", false)        
    ];

    constructor( private todoCardsService: TodoCardsService ) { }


  

    getTasks()  {  
        // let todoCards = this.todoCardsService.getTodoCards();
        // console.log('Main Card Service cards,  ', todoCards)
        // for( let card of todoCards ){
        //     for( let task of card.taskArray ){
        //         this.taskArray.push(task)
        //     }
        // }
        // console.log('Task Array: ', this.taskArray)
        // return this.taskArray;
    }
    
    removeTasks( todoTask: TodoTaskModel ){
        
        for (let i = 0; i < this.taskArray.length; i++){
            if (this.taskArray[i] === todoTask){
                this.taskArray.splice( i, 1);
            }
        }
        // if the task is removed from main-card service remove it in the todo card where 
        // it's positioned
    }

}
