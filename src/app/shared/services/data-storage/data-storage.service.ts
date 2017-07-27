import { TodoTaskModel } from './../../todo-task.model';
import { SimpleTodoCardModel } from './../../simple-todo-card.model';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
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




    storeCard( simpleCard: SimpleTodoCardModel ){
        this.firebase_db.database.ref('cards/'+ simpleCard.id ).set( simpleCard )
    }
    storeTask( todoTask: TodoTaskModel ) {

    }


    getCards(): Observable<SimpleTodoCardModel[]> {

        let subject: Subject<SimpleTodoCardModel[]> = new Subject();

        this.firebase_db.database.ref('cards/').on('value',
            (cardArray)=>{
                
                subject.next( <SimpleTodoCardModel[]> cardArray.toJSON() );
            }
        )

        return subject.asObservable();
    }



    getTasksForCard( cardId: number ): Observable<TodoTaskModel[]> {
        let subject: Subject<TodoTaskModel[]> = new Subject();

        this.firebase_db.database.ref('cards/').orderByChild('id').equalTo(cardId).on(
            'value',  (data) =>{
               subject.next( <TodoTaskModel[]> data.toJSON() )
            }    
        );
        return subject.asObservable();
    }

    
    getData(){
        
        return this.http.get('https://todo-app-13093.firebaseio.com/data.json')
            // If there is no taskArray in card add taskArray field
            .map(
                (response?: Response) => {
                    let todoCards : TodoCardModel[];
                    
                    if (response.json()){
                        console.log('RESPONSE', response)
                        // Reciving String of todo cards that we need to extracth JS objects from                        
                        todoCards = response.json()
                        for( let cards of todoCards ){
                            if (!cards.taskArray){
                                cards.taskArray = [];
                            }
                        }
                    }
                    else {
                        todoCards = [];
                    }
                    return todoCards;
                }
            )
            .subscribe (
                ( todoCards: TodoCardModel[] ) => {
                    // assinging the recived, extracted JS object to the TodoCardService 
                    this.todoCardsService.setTodoCards(todoCards);
                }
                
            )}

}
