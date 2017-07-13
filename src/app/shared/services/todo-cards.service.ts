import { TodoTaskService } from './todo-task.service';

// Modules Used
import { TodoTask } from './../todo-task.module';
import { TodoCard } from './../../todo-card/todo-card.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';



@Injectable()
export class TodoCardsService {

    constructor( private todoTaskService: TodoTaskService,
                 private http: Http ) { }

    

    todoCards: TodoCard[] = [
        new TodoCard(0, 'yellowCardHeader',    'Every Day', [new TodoTask( 1, 'Learn Angular 4', false)]),
        new TodoCard(1, 'turquoiseCardHeader', 'Monthly', [new TodoTask( 1, 'Learn Angular 4', false)] )
    ]   
    getCardsArray(){
        return this.todoCards;
    }

    createTodoCard():void {
        let id: number          = this.getCardID();
        let headerColor: string = this.getCardHeaderColor();
        let title: string       = this.getCardTitle( );
        let tasks: TodoTask[]   = this.getTasks();


        const newCard = new TodoCard(id, headerColor, title, tasks)
        this.todoCards.push( newCard );
    }
    
    addTodoCard( cardTitle?:string, taskArray?: TodoTask[] ):void{
        let id: number          = this.getCardID();
        let headerColor: string = this.getCardHeaderColor();
        let title: string       = this.getCardTitle( cardTitle );
        let tasks: TodoTask[]   = this.getTasks(taskArray);


        const newCard = new TodoCard(id, headerColor, title, tasks)
        this.todoCards.push( newCard );
        console.log("Todo Card created", newCard)
    }
    getTodoCards(){
        return this.todoCards;
    }
    setTodoCards( cards: TodoCard[] ) {
        this.todoCards = cards;
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
    getTasks(taskArray?: TodoTask[] ): TodoTask[]{
        let tasks: TodoTask[] = taskArray ? taskArray : this.todoTaskService.getTasks();
        return tasks;
    }

    // EDITS
    addNewTask( description: string, checked: boolean ){
        console.log('Fill out \'addNewTask\' method in the \'TodoCardsService\' ')
        this.todoTaskService.addNewTask(description, checked)
    }
    onTitleChange(  id: number, newTitle: string ){
        this.todoCards[id].title = newTitle;
        console.log('new title is ', newTitle);
    }
    onCardDelete( deletedCardID:number ){
        for(let i = 0; i < this.todoCards.length; i++){
            if( this.todoCards[i]['id'] === deletedCardID ){
                this.todoCards.splice(i, 1);
            }
        }
    }

}
