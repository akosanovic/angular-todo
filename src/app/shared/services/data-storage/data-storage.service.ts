import { TodoCard } from '../../../todo-card/todo-card.model';
import { TodoCardsService } from '../todo-cards.service';

import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { error } from 'util';

import 'rxjs/Rx';

@Injectable()
export class DataStorageService implements OnInit{

    constructor( private http: Http, private todoCardsService: TodoCardsService) { }
    ngOnInit(){}

    storeData(){
        return this.http.put('https://todo-app-13093.firebaseio.com/data.json', 
                        this.todoCardsService.getTodoCards() )
    }
    getData(){
        return this.http.get('https://todo-app-13093.firebaseio.com/data.json')
                .subscribe(
                    (response: Response ) => {
                        // Reciving String of todo cards that we need to extracth JS objects from
                        const todoCards: TodoCard[] = response.json()
                        // assinging the recived, extracted JS object to the TodoCardService 
                        this.todoCardsService.setTodoCards(todoCards);
                    }
                )
    }

}
