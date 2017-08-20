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

    // Loading Icon Visible
    headerLoader = false;

    cardTasksArray: TodoTaskModel[] = [];

    // Input Field for the new task
    @ViewChild('inputTaskDetails') inputTaskDetails: ElementRef;
    @ViewChild('cardTitle') cardTitleRef: ElementRef;

    // IMPORTANT
    // creating new instance of the todo card, listen for event when card is created
    @Input('todoCard') card: SimpleTodoCardModel;



    // LIFE HOOKS
    constructor( private newTaskInput      : ElementRef,
                 private todoTaskService   : TodoTaskService,
                 private todoCardsService  : TodoCardsService,
                 private dataStorageService: DataStorageService) { }
   

    ngOnInit() {
        // Edit Title
        this.todoCardsService.cardEdited$
            .subscribe(
                (card:SimpleTodoCardModel) => {

                    if (this.card.id === card.id) {
                        this.card.title = card.title;
                        console.log("Card Title changed", this.card.title)
                        this.headerLoader = false;
                    }

                }
            )
        // Get All Tasks
        this.todoTaskService.getTasksForCard( this.card.id )

        // Watch for new tasks
        this.todoTaskService.getTaskForCard$
            .subscribe(
                (todoTasks: TodoTaskModel[]) => {
                    this.cardTasksArray = todoTasks;
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
    editCardHeader(e): void {
        e.stopPropagation();
        this.disableCardTitle = false;
        this.cardTitleRef.nativeElement.value = '';
        this.cardTitleRef.nativeElement.focus();
        this.hideCardMenu();
    }


    changeCardTitle() {
        const newTitleInput: string = this.cardTitleRef.nativeElement.value
        const id: number = this.card.id;

        if (newTitleInput) {
            this.headerLoader = true;
            this.todoCardsService.editCard(this.card, newTitleInput)
        }
        else {
            this.cardTitleRef.nativeElement.value = this.card.title;
        }
       this.disableCardTitle = true;
     }


    deleteTodoCard(e) {
        e.stopPropagation();

        this.hideCardMenu();
        this.todoCardsService.deleteCard( this.card.id );
    }// Card Menu Options :: END


    showNewTaskInput(){
       if (this.showTaskInput === false) {
            this.showTaskInput = true;
            this.inputTaskDetails.nativeElement.focus();
       }
    }

    addNewTask( todoTask: TodoTaskModel ){
        this.todoTaskService.storeTask( todoTask );
    }

    newTaskAdded(e) { 

        if(e.target.value) {
            // New TodoTask
            let taskDescription = this.inputTaskDetails.nativeElement.value;
            let tempTaskId      = (new Date()).getTime()
            let task            = new TodoTaskModel( tempTaskId, this.card.id, taskDescription, false )

            console.log(task, "task description")
            this.addNewTask(task)
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
            this.addNewTask( task );   
        }
        this.hideNewTaskInput(e)
    }

   


    hideNewTaskInput(e) {
        e.target.value = ' ';
        e.target.blur();
       setTimeout( ()=>{
            this.showTaskInput = false;
       }, 500 )
    }
}
