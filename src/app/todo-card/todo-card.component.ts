import { TodoTaskModel } from './../shared/todo-task.model';
import { SimpleTodoCardModel } from './../shared/simple-todo-card.model';
import { Response } from '@angular/http';
import { DataStorageService } from './../shared/services/data-storage/data-storage.service';


import { TodoTaskService } from './../shared/services/todo-task.service';
import { TodoCardsService } from './../shared/services/todo-cards.service';
import "rxjs/Rx"
import { Component,
         ElementRef,
         Input,
         OnInit,
         ViewChild,
         ViewEncapsulation } from '@angular/core';

@Component({
    selector   : 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrls  : ['./todo-card.component.scss'],
    // styles from todoTask can be applied 
    encapsulation: ViewEncapsulation.None,
    providers: [TodoTaskService]
})


export class TodoCardComponent implements OnInit {
    // PROPERTIES 
    // event handling properties;
    showCardDrpodownMenu = false;
    showTaskInput        = false;
    disableCardTitle     = true;
    
    // HeaderLoader
    headerLoader = false;

    cardTasksArray: TodoTaskModel[] = [];

    // Input Field for the new task
    @ViewChild('inputTaskDetails') inputTaskDetails: ElementRef;
    @ViewChild('cardTitle') cardTitleRef: ElementRef;
    
    // IMPORTANT
    // creating new instance of the todo card, listen for event when card is created
    @Input('todoCard') card: SimpleTodoCardModel;



    // LIFE HOOKS
    constructor( private newTaskInput:ElementRef,
                 private todoTaskService: TodoTaskService,
                 private todoCardsService: TodoCardsService,
                 private dataStorageService: DataStorageService) { }
   

    ngOnInit() {
        this.dataStorageService.getTasksForCard( this.card.id ).subscribe(
            (todoTaskArray: TodoTaskModel[]) =>{
                this.cardTasksArray = todoTaskArray;
                console.log('Task Array', todoTaskArray)
            }
        )
    }



    // METHODS
    // click event handling    
    toggleCardMenu() {
        this.showCardDrpodownMenu = !this.showCardDrpodownMenu;
    }
    hideCardMenu() {
        this.showCardDrpodownMenu = false;
    }


    // Card Menu Options :: BEGIN
    editCardHeader(e):void {
        e.stopPropagation();
        this.disableCardTitle = false;
        this.cardTitleRef.nativeElement.value = '';        
        this.cardTitleRef.nativeElement.focus();
        this.hideCardMenu();
    }


    changeCardTitle(){
        let newTitleInput:string = this.cardTitleRef.nativeElement.value
        let id: number = this.card.id;
        
        if (newTitleInput){  
            this.headerLoader = true;          
            this.dataStorageService.editCard( id, newTitleInput)
                .subscribe(
                    (value) => {
                        console.log('Todo Card Change card Title', value)
                        this.headerLoader = false;
                    }
                )                
        }
        else {
            this.cardTitleRef.nativeElement.value = this.card.title;
        }
       this.disableCardTitle = true;
     }

    
    deleteTodoCard(e) {
        e.stopPropagation();

        this.hideCardMenu();
        this.dataStorageService.deleteCard( this.card );
    }// Card Menu Options :: END


    showNewTaskInput(){
       if(this.showTaskInput === false){
            this.showTaskInput = true;
            this.inputTaskDetails.nativeElement.focus();
       }
    }


    newTaskAdded(e) {        
        let taskDescription: string;

        /*if clicked on enter (replace this with custom directive)*/
        if(e.target.value ) {
            // New TodoTask
            taskDescription = this.inputTaskDetails.nativeElement.value;           
            let tempTaskId = (new Date()).getTime()
            
            let task = new TodoTaskModel( tempTaskId, this.card.id, taskDescription, false )
            console.log(task, "task description")
            this.dataStorageService.storeTask(task)
             this.hideNewTaskInput(e);
        }
    }

    newTaskInputBlured(e){
        let taskDescription: string = this.inputTaskDetails.nativeElement.value;
        if (taskDescription && taskDescription != ' '){

           // New TodoTask
            taskDescription = this.inputTaskDetails.nativeElement.value;           
            let tempTaskId = (new Date()).getTime()
            
            let task = new TodoTaskModel( tempTaskId, this.card.id, taskDescription, false )
            this.dataStorageService.storeTask( task );   
        }
        this.hideNewTaskInput(e)
    }

    addNewTask(){
        
    }


    hideNewTaskInput(e) {
        e.target.value = ' ';
        e.target.blur();
       setTimeout( ()=>{
            this.showTaskInput = false;
       }, 500 )
    }
}
