import { TodoCardModel } from './../../../todo-card/todo-card.model';
import { TodoCardsService } from '../todo-cards.service';

import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { error } from 'util';

import 'rxjs/Rx';

@Injectable()


export class DataStorageService implements OnInit{

    constructor( private http: Http, 
                 private todoCardsService: TodoCardsService) { }
    ngOnInit(){}



    storeData(){
        this.http.put('https://todo-app-13093.firebaseio.com/data.json', this.todoCardsService.getTodoCards() )
            .subscribe(
                (response: Response) => {
                     console.log('Data Stored to Firebase', response);
                },
                (error) => {
                    console.log( "Error occured", error );
                }
            )
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
