import { Subject, Observable } from 'rxjs/Rx';
import { DataStorageService } from './data-storage/data-storage.service';
import { Injectable } from '@angular/core';
import { TodoTaskModel } from './../todo-task.model';


@Injectable()
export class TodoTaskService {
    
    
    todoTaskCreated$ = new Subject<TodoTaskModel>();


    constructor( public db: DataStorageService ){
    }

    createTask( todoTask: TodoTaskModel ){
        // this.db.storeTask(todoTask).subscribe(
        //     (value) => {
        //         // debugger
        //         this.todoTaskCreated$.next(todoTask)
        //     }
        // )

    }

    statusChangeTodoTask( id: number, newStatus: boolean ){
        this.db.updateTaskStatus(id, newStatus);
    }


    editTodoTask( todoTask: TodoTaskModel, newDescription: string ){
        // let todoCards = this.getTodoCards();
        // for (let card of todoCards){
        //     for(let i = 0; i < card.taskArray.length;  i++){
        //         if( card.taskArray[i] === todoTask ){
        //             card.taskArray[i].description = newDescription;

        //             this.setTodoCards(todoCards);                    
        //             this.publishAllTasks();
        //         }
        //     }
        // }
    }


    deleteTodoTask( todoTask: TodoTaskModel ) {
        // let todoCards = this.getTodoCards();
        // for (let card of todoCards){
        //     for( let i = 0; i < card.taskArray.length; i++  ){
        //         if ( todoTask == card.taskArray[i]){
        //             card.taskArray.splice(i, 1);
                    
        //             this.setTodoCards(todoCards);
        //             this.publishAllTasks();
        //         }
        //     }
        // }
    }



}