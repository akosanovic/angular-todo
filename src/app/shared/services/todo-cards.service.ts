import { SimpleTodoCardModel } from './../simple-todo-card.model';
import { TodoTaskModel } from './../todo-task.model';
import { MainCardService } from './main-card.service';

import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';




@Injectable()
export class TodoCardsService {
    // OBSERVABLES

  

    constructor( ) { }


    private todoCards: TodoCardModel[] = []   

    getCardsArray(){
        return this.todoCards.slice();
    }




    
    setTodoCards( cards?: TodoCardModel[] ) {
        if(cards.length > 0){
            this.todoCards = cards;
            this.todoCardsObservable.next( this.todoCards.slice()  );
        }
    }
   
    getTodoCards(){
        return this.todoCards.slice();
    }
   


  

    
    getCardHeaderColor(id: number):string {
        const colorArray: [string] = [  "yellow", "turquoise", "purple", "blue", "orange" ];
        
        let colorArrayLenth:number = colorArray.length;
       
        if ( id >= colorArrayLenth){ 
            id = id % colorArrayLenth;
        }
        let colorArrayHeader = colorArray[id]+'CardHeader'
        return colorArrayHeader;
    }


    getCardTitle( cardTitle?:string ): string{
        let title: string = cardTitle ? cardTitle : 'Edit Card Title';
        return title;
    }

    // TASKS
    addNewTask( cardID: number,  description: string, checked: boolean  ): void{
       
        for(let i = 0; i < this.todoCards.length; i++) {
            if(this.todoCards[i]['id'] === cardID){
                let id:number   = this.todoCards[i].taskArray.length;
                let newTodoTask: TodoTaskModel = new TodoTaskModel(id, description, checked )
                console.log ('New Todo Task Object', newTodoTask, this.todoCards);

                
                this.todoCards[i].taskArray.unshift( newTodoTask );
                this.publishAllTasks()
                // Adding new task to the Main Card (oldest tasks)
                // this.mainCardService.getTasks( newTodoTask );
            }
        }
       
    }
  
    private publishAllTasks() {
        let taskArray: TodoTaskModel[] = [];
        for( let card of this.getTodoCards() ){
            for( let task of card.taskArray ){
                taskArray.push( task );
            }
        }
        return this.todoTaskObservable.next( taskArray );
    }

    statusChangeTodoTask( todoTask: TodoTaskModel, newStatus: boolean ){
        let todoCards = this.getTodoCards();
        for(let card of todoCards){
            for(let i = 0; i < card.taskArray.length; i++){
                if( card.taskArray[i] === todoTask ){
                    card.taskArray[i].checked = newStatus;

                    this.setTodoCards(todoCards);
                    this.publishAllTasks();
                }
            }
        }
    }


    editTodoTask( todoTask: TodoTaskModel, newDescription: string ){
        let todoCards = this.getTodoCards();
        for (let card of todoCards){
            for(let i = 0; i < card.taskArray.length;  i++){
                if( card.taskArray[i] === todoTask ){
                    card.taskArray[i].description = newDescription;

                    this.setTodoCards(todoCards);                    
                    this.publishAllTasks();
                }
            }
        }
    }


    deleteTodoTask( todoTask: TodoTaskModel ) {
        let todoCards = this.getTodoCards();
        for (let card of todoCards){
            for( let i = 0; i < card.taskArray.length; i++  ){
                if ( todoTask == card.taskArray[i]){
                    card.taskArray.splice(i, 1);
                    
                    this.setTodoCards(todoCards);
                    this.publishAllTasks();
                }
            }
        }
    }

}
