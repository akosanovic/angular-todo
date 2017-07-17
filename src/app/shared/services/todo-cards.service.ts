import { TodoTaskModel } from './../todo-task.model';
import { MainCardService } from './main-card.service';
import { TodoTaskService } from './todo-task.service';

// Modules Used

import { TodoCardModel } from './../../todo-card/todo-card.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';




@Injectable()
export class TodoCardsService {
    // OBSERVABLES
    todoCardsObservable = new Subject<TodoCardModel[]>();
    todoTaskObservable = new Subject <TodoTaskModel[]>();

    constructor( private todoTaskService   : TodoTaskService,
                 private http              : Http) { }


    private todoCards: TodoCardModel[] = []   

    getCardsArray(){
        return this.todoCards.slice();
    }

    addTodoCard():void {
        let id: number             = this.getCardID();
        let headerColor: string    = this.getCardHeaderColor();
        let title: string          = this.getCardTitle( );
        let tasks: TodoTaskModel[] = this.getTasks();
        const newCard = new TodoCardModel(id, headerColor, title, tasks)


        console.log('New Card created', newCard);
        this.todoCards.push( newCard );
        this.todoCardsObservable.next(this.todoCards.slice());
    }
    
    setTodoCards( cards: TodoCardModel[] ) {
        console.log("New todoCards array ", cards)
        this.todoCards = cards;
        this.todoCardsObservable.next( this.todoCards.slice()  );
    }
   
    getTodoCards(){
        return this.todoCards.slice();
    }
   


  

    getCardID():number{
        return this.todoCards.length;
    }
    getCardHeaderColor():string {
        const colorArray: [string] = [  "yellow", "turquoise", "purple", "blue", "orange" ];
        
        let colorArrayLenth:number = colorArray.length;
        let cardsArrayLenth:number = this.todoCards.length;
        if (cardsArrayLenth >= cardsArrayLenth){
            cardsArrayLenth = cardsArrayLenth % colorArrayLenth;
        }
        let colorArrayHeader = colorArray[cardsArrayLenth]+'CardHeader'
        return colorArrayHeader;
    }
    getCardTitle( cardTitle?:string ): string{
        let title: string = cardTitle ? cardTitle : 'Edit Card Title';
        return title;
    }
    getTasks(taskArray?: TodoTaskModel[] ): TodoTaskModel[]{
        let tasks: TodoTaskModel[] = taskArray ? taskArray : [];
        return tasks;
    }





// EDIT CARD

    onTitleChange(  id: number, newTitle: string ): void{
        this.todoCards[id].title = newTitle;
        console.log('new title is ', newTitle);
    }
    onCardDelete( deletedCardID:number ){
        for(let i = 0; i < this.todoCards.length; i++){
            if( this.todoCards[i]['id'] === deletedCardID ){
                let card = this.todoCards.splice(i, 1);
                this.destroyTodoCard(card[0]);
            }
        }
        this.todoCardsObservable.next(this.todoCards.slice());
        
    }
    destroyTodoCard( card: TodoCardModel ){
        card.headerColor = null;
        card.taskArray = null;
        card.id = null;
        card.title = null;
        card = null;
    }
     
    
    // TASKS
    addNewTask( cardID: number,  description: string, checked: boolean  ): void {
       
        for(let i = 0; i < this.todoCards.length; i++) {
            if(this.todoCards[i]['id'] === cardID){
                let id:number   = this.todoCards[i].taskArray.length;
                let newTodoTask: TodoTaskModel = new TodoTaskModel(id, description, checked )
                console.log ('New Todo Task Object', newTodoTask, this.todoCards);

                
                this.todoCards[i].taskArray.unshift( newTodoTask );
                this.getTodoTasks()
                // Adding new task to the Main Card (oldest tasks)
                // this.mainCardService.getTasks( newTodoTask );
            }
        }
       
    }
    getInitialTasks(): TodoTaskModel[] {
        let taskArray: TodoTaskModel[] = [];
        for( let card of this.getTodoCards() ){
            for( let task of card.taskArray ){
                taskArray.push( task );
            }
        }
        return taskArray;
    }
    getTodoTasks(){
        let taskArray: TodoTaskModel[] = [];
        for( let card of this.getTodoCards() ){
            for( let task of card.taskArray ){
                taskArray.push( task );
            }
        }
        return this.todoTaskObservable.next( taskArray );
        
    }
    editTodoTask( todoTask: TodoTaskModel, newDescription: string ){
        console.log("EDIT TASK: todoTask: ", todoTask, "Value: ", newDescription)
        let todoCards = this.getTodoCards();
        for (let card of todoCards){
            for(let i = 0; i < card.taskArray.length;  i++){
                if( card.taskArray[i] === todoTask ){
                    card.taskArray[i].description = newDescription;
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
                    this.todoCardsObservable.next(this.todoCards.slice());
                }
            }
        }
    }

}
