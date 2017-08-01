import { Subject, Observable } from 'rxjs/Rx';
import { DataStorageService } from './data-storage/data-storage.service';
import { TodoTaskModel } from './../todo-task.model';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/Rx';


@Injectable()
export class MainCardService {

    private getOldestTasksSubject = new Subject<TodoTaskModel[]>();
    getOldestTasks$ = this.getOldestTasksSubject.asObservable();


    constructor( private dataStorageService: DataStorageService ) { }


  

    getOldestTasks(): Observable<TodoTaskModel[]>  {  
        return this.dataStorageService.getOldestTasks()
    }
    
    removeTasks( todoTask: TodoTaskModel ){
        
        // if the task is removed from main-card service remove it in the todo card where 
        // it's positioned
    }

}
