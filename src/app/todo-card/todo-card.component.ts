import { TodoTaskService } from '../shared/services/todo-task.service';
import { TodoTask } from './../shared/todo-task.module';
import { TodoCard } from './todo-card.model';
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
    providers    : [TodoTaskService]
})


export class TodoCardComponent implements OnInit {
    // PROPERTIES 
    // event handling properties;
    showCardDrpodownMenu = false;
    showTaskInput        = false;
    disableCardTitle     = true;

    taskCounter;

    card: TodoCard;

    // Input Field for the new task
    @ViewChild('inputTaskDetails') inputTaskDetails: ElementRef;
    @ViewChild('cardTitle') cardTitleRef: ElementRef;
    @Input('todoCard') newCard: TodoCard;

    taskArray: [TodoTask];




    // LIFE HOOKS
    constructor( private newTaskInput:ElementRef,
                 private todoTaskService: TodoTaskService ) { }
   
    ngOnInit() {
        console.log(" Card title ", this.card);
        this.card      = this.newCard;
        this.taskArray = this.todoTaskService.taskArray;
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
        let inputTitle:string = this.cardTitleRef.nativeElement.value
       if (inputTitle){
            this.card.title = inputTitle;
       }
       else {
           this.cardTitleRef.nativeElement.value = this.card.title;
       }
       this.disableCardTitle = true;
    }


    deleteTodoCard(e) {
        e.stopPropagation();
        this.hideCardMenu();
    
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
        if(e.which === 13 && e.target.value ) {
            // Add new Todo Task Object to the Array
            taskDescription = this.inputTaskDetails.nativeElement.value;
            this.todoTaskService.addNewTask( taskDescription, false )
            
            this.hideNewTaskInput(e);
        }
    }
    newTaskInputBlured(e){
        let taskDescription: string = this.inputTaskDetails.nativeElement.value;
        if (taskDescription && taskDescription != ' '){
            console.log('Task Description', taskDescription)
            this.todoTaskService.addNewTask( taskDescription, false )
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
