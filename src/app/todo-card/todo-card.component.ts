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
    

    showCardDrpodownMenu = false;
    showTaskInput = false;    
    
    taskCounter;

    card: TodoCard;

    // Input Field for the new task
    @ViewChild('inputTaskDetails') inputTaskDetails: ElementRef;
    @Input('todoCard') newCard: TodoCard;

    taskArray: [TodoTask];
    
    constructor( private newTaskInput:ElementRef,
                 private todoTaskService: TodoTaskService ) { }
   
    ngOnInit() {
        console.log(" Card title ", this.card);
        this.card      = this.newCard;
        this.taskArray = this.todoTaskService.taskArray;
    }


    showCardMenu(){
        this.showCardDrpodownMenu = !this.showCardDrpodownMenu;
    }
    showNewTaskInput(){
        this.showTaskInput = !this.showTaskInput;
        this.inputTaskDetails.nativeElement.focus();
        console.log("NEW task input focus")
    }


    newTaskAdded(e) {        
        let taskDescription: string;
        let taskId: number = this.taskArray.length;


        // if clicked on enter (replace this with custom directive)
        if(e.which === 13 && e.target.value ) {
            // Add new Todo Task Object to the Array
            taskDescription = this.inputTaskDetails.nativeElement.value;
            this.todoTaskService.addNewTask( taskDescription, false )
            
            this.hideNewTaskInput(e);
        }
    }



    hideNewTaskInput(e) {
        e.target.value = '';
       setTimeout( ()=>{
            this.showTaskInput = false;
       }, 500 )
    }
}
