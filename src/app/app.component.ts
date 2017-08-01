import { Subscription } from 'rxjs/Rx';
import { SimpleTodoCardModel } from './shared/simple-todo-card.model';
import { TodoTaskModel } from './shared/todo-task.model';
import { Task } from 'protractor/built/taskScheduler';
import { MainCardService } from './shared/services/main-card.service';
import { TodoTaskComponent } from './todo-card/todo-task/todo-task.component';
import { TodoCardsService } from './shared/services/todo-cards.service';
import { DataStorageService } from './shared/services/data-storage/data-storage.service';
import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    Input,
    OnDestroy,
    OnInit,
    ViewContainerRef,
} from '@angular/core';

import 'rxjs/Rx';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss'],

})

export class AppComponent implements OnInit, OnDestroy  {
    todoCardCounter:number = 0;

    todoCardArray: SimpleTodoCardModel[] = [];

    cardAddedSubscription: Subscription;
   
    constructor(    private todoCardService: TodoCardsService ,
                    private dataStorageService: DataStorageService,
                    // Main Card Component
                    private mainCardService: MainCardService,){}

   
    ngOnInit(){
        
        let todoCards = this.todoCardService.getAllCards()
            .subscribe(
                (result:SimpleTodoCardModel[])=>{
                    this.todoCardArray = result;
                }
            );            


        this.cardAddedSubscription = this.todoCardService.cardAdded$
            .subscribe( 
                (newCard) => {
                    this.todoCardArray.push( newCard );
                }
            ); 
        this.todoCardService.cardDeleted$
            .subscribe(
                (cardId) => {
                    console.log('Remove tasks from card')
                    this.removeCardFromArray(cardId)
                }                    
                    
            )
    }  


    ngOnDestroy() {

        this.cardAddedSubscription.unsubscribe();
    }
    
    removeCardFromArray( cardID:number ){
        let arrayLength = this.todoCardArray.length
        for(let i = 0; i < arrayLength; i++){
            if( this.todoCardArray[i].id === cardID ){
                this.todoCardArray.splice(i, 1);
            }
        }
       
    }



}
