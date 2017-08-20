import { TodoTaskModel } from './../../todo-task.model';
import { SimpleTodoCardModel } from './../../simple-todo-card.model';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, observeQuery } from 'angularfire2/database';
import { TodoCardsService } from '../todo-cards.service';

import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { error } from 'util';

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

    constructor( private http: Http,
                 private firebase_db: AngularFireDatabase ) { }



    // CARDS
    getCards(): Observable<SimpleTodoCardModel[]> {
        return this.firebase_db.list('cards');
    }

    getCardById( cardId: number ): FirebaseObjectObservable<SimpleTodoCardModel> {
        return this.firebase_db.object('cards/' + cardId );
    }

    storeCard( simpleCard: SimpleTodoCardModel ): Observable<any> {
        const promise =  this.firebase_db.object('cards/' + simpleCard.id ).set(simpleCard)
        return Observable.fromPromise(promise);
    }

    editCard( cardId: number, title: string ): Observable<any> {
        const promise = this.getCardById(cardId).update({ title: title})
        return Observable.fromPromise(promise);
    }

    deleteCard( cardId: number ): Observable<any> {
        this.deleteTasksForCard( cardId )
        const promise = this.firebase_db.object('cards/' + cardId).remove()
        return Observable.fromPromise(promise)
    }



    // TASKS
    getTaskById( taskId: number ): Observable<TodoTaskModel> {
        return this.firebase_db.object('tasks/' + taskId)
    }
   
    getTasksForCard( cardId: number ): Observable<TodoTaskModel[]> {
        return this.firebase_db.list('tasks/', {
            query:{
                orderByChild: 'cardId',
                equalTo: cardId
            }
        });
   }

    getOldestTasks(): Observable<TodoTaskModel[]>{
        return this.firebase_db.list('tasks/', {
            query:{
                limitToFirst: 3,
                orderByChild: 'checked',
                equalTo: false
            }
        })
    }

    storeTask( todoTask: TodoTaskModel ): Observable<any> {
        let promise =  this.firebase_db.object('tasks/'+todoTask.id ).set(todoTask)
        console.log(promise)
        return Observable.fromPromise(promise);
    }
    
    updateTaskStatus( taskId:number, status:boolean ):Observable<any>{
        console.log('Do you work?', status)
        let promise = this.firebase_db.object('tasks/' + taskId).update({checked: status})
        return Observable.fromPromise(promise);

    }

    editTaskDescription( taskId: number, newDescription: string ): Observable<any>{
        let response = this.firebase_db.object( 'tasks/'+ taskId ).update( {description: newDescription} )
        return Observable.fromPromise(response);
    }

    deleteTask( taskId:number ):Observable<any>{
        let promise = this.firebase_db.object( 'tasks/'+ taskId ).remove();
        return Observable.fromPromise(promise)
    }

    deleteTasksForCard( cardId: number ){
        let todoTaskArray = this.firebase_db.list('tasks/', {
            query:{
                orderByChild: "cardId",
                equalTo: cardId
            }
        })
        todoTaskArray.remove();
    }

    
    

    
}
