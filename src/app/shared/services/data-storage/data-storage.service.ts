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


export class DataStorageService implements OnInit{

    constructor( private http: Http, 
                 private todoCardsService: TodoCardsService,
                 private firebase_db: AngularFireDatabase ) { }
    ngOnInit(){}


    
    // CARDS
    getCards(): Observable<SimpleTodoCardModel[]> {
        return this.firebase_db.list("cards")         
    }
                
    getCardById( cardId: number ):FirebaseObjectObservable<SimpleTodoCardModel> {
        return this.firebase_db.object('cards/'+cardId );
    }

    storeCard( simpleCard: SimpleTodoCardModel ): Observable<any> {
        let promise =  this.firebase_db.object('cards/'+simpleCard.id ).set(simpleCard)
        return Observable.fromPromise(promise);
    }

    editCard( cardId: number, title: string ):Observable<any>{
        let promise = this.getCardById(cardId).update({ title: title})
        return Observable.fromPromise(promise);
    }

    // Recive Data  
    deleteCard( card: SimpleTodoCardModel ){

    }
   


    // TASKS
    getTaskById( taskId:number ): Observable<TodoTaskModel>{
        return this.firebase_db.object('tasks/'+taskId)
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
               limitToLast: 3
           }
       })
   }

    storeTask( todoTask: TodoTaskModel ): Observable<any> {
        let promise =  this.firebase_db.object('tasks/'+todoTask.id ).set(todoTask)
        console.log(promise)
        return Observable.fromPromise(promise);
    }

    updateTask( taskId:number, fieldToChange: string, valueToPass:any ){
        this.firebase_db.object( 'tasks/' + taskId ).update({ fieldToChange: valueToPass })
    }
    
    updateTaskStatus( taskId:number, status:boolean ){
       this.firebase_db.object
    }

    editTaskDescription( taskId: number, newDescription: string ){
        this.firebase_db.object( 'tasks/'+ taskId ).update( {description: newDescription} )
    }

    deleteTask( taskId:number ){
        this.firebase_db.object( 'tasks/'+ taskId ).remove();
    }

    
    

    
}
