import { Subject, Observable } from 'rxjs/Rx';
import { DataStorageService } from './data-storage/data-storage.service';
import { Injectable } from '@angular/core';
import { TodoTaskModel } from './../todo-task.model';


@Injectable()
export class TodoTaskService {
    
    
    private taskCreatedSubject = new Subject<TodoTaskModel>();
    public todoTaskCreated$ = this.taskCreatedSubject.asObservable();
    
    private getTaskForCardSubject = new Subject<any>();
    getTaskForCard$  = this.getTaskForCardSubject.asObservable();

    private editTaskDescriptionSubject = new Subject<any>();
    editTaskDescription$ = this.editTaskDescriptionSubject.asObservable();

    private deleteTaskSubject = new Subject<string>();
    deleteTask$ = this.deleteTaskSubject.asObservable();


    constructor( public dataStorageService: DataStorageService ){
    }

    storeTask (todoTask: TodoTaskModel) {
        this.dataStorageService.storeTask( todoTask )
            .subscribe(
                ( todoTask: TodoTaskModel ) => {
                    this.taskCreatedSubject.next(todoTask)
                }
            )
    }
    getTasksForCard ( cardId: number ) {
        this.dataStorageService.getTasksForCard( cardId )
            .subscribe(
                (value) => {
                    this.getTaskForCardSubject.next( value )
                }
            )
    }

    statusChangeTodoTask( id: number, newStatus: boolean ){
        this.dataStorageService.updateTaskStatus(id, newStatus);
    }


    editTaskDescription( id: number, newDescription: string ){
        this.dataStorageService.editTaskDescription( id, newDescription)
            .subscribe(
                (newDescription: string) => {
                    this.editTaskDescriptionSubject.next(newDescription)
                }
            )
    }


    deleteTask( id: number ){
        this.dataStorageService.deleteTask( id )
            .subscribe(
                (returned: any) => {
                   this.deleteTaskSubject.next(returned)
                }
            )
    }



}