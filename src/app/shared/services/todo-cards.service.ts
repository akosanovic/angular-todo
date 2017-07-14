import { MainCardService } from './main-card.service';
import { TodoTaskService } from './todo-task.service';

// Modules Used
import { TodoTask } from './../todo-task.module';
import { TodoCard } from './../../todo-card/todo-card.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';



@Injectable()
export class TodoCardsService {

    todoCardsListChanged = new EventEmitter<TodoCard[]>();

    constructor( private mainCardService: MainCardService, 
                 private todoTaskService: TodoTaskService,
                 private http: Http ) { }

    

    private todoCards: TodoCard[] = [
        new TodoCard(0, 'yellowCardHeader',    'Every Day',
                    [ new TodoTask( 1, 'Learn Angular 4', false),
                      new TodoTask( 2, 'How to tell which card stores which tasks?', false),
                      new TodoTask( 3, 'How to find oldest tasks?', false),
                      new TodoTask( 4, 'What is the problem with task group in todo cards?', false),
                      new TodoTask( 5, 'Binding to the data property: card & task', false), 
                      new TodoTask( 6, 'Create custom directive - event: \'enter pressed \'  ', false)]),
        new TodoCard(1, 'turquoiseCardHeader', 'Monthly', [new TodoTask( 1, 'Learn Angular 4', false)] )
    ]   
    getCardsArray(){
        return this.todoCards.slice();
    }

    addTodoCard():void {
        let id: number          = this.getCardID();
        let headerColor: string = this.getCardHeaderColor();
        let title: string       = this.getCardTitle( );
        let tasks: TodoTask[]   = this.getTasks();
        const newCard = new TodoCard(id, headerColor, title, tasks)


        console.log('New Card created', newCard);
        this.todoCards.push( newCard );
        this.todoCardsListChanged.emit(this.todoCards.slice());
    }
    
  
    getTodoCards(){
        return this.todoCards.slice();
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
        let tasks: TodoTask[] = taskArray ? taskArray : [];
        return tasks;
    }





    // EDITS
    addNewTask( cardID: number,  description: string, checked: boolean  ): void{
       
        for(let i = 0; i < this.todoCards.length; i++) {
            if(this.todoCards[i]['id'] === cardID){
                let id:number   = this.todoCards[i].taskArray.length;
                let newTodoTask: TodoTask = new TodoTask(id, description, checked )
                
                this.todoCards[i].taskArray.unshift( newTodoTask );
                // Adding new task to the Main Card (oldest tasks)
                this.mainCardService.getTasks( newTodoTask );
            }
        }
       
    }


    onTitleChange(  id: number, newTitle: string ): void{
        this.todoCards[id].title = newTitle;
        console.log('new title is ', newTitle);
    }
    onCardDelete( deletedCardID:number ){
        for(let i = 0; i < this.todoCards.length; i++){
            if( this.todoCards[i]['id'] === deletedCardID ){
                this.todoCards.splice(i, 1);
            }
        }
        this.todoCardsListChanged.emit(this.todoCards.slice());
    }

}
