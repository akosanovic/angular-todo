import { TodoTask } from './../shared/todo-task.module';
import { TodoCard } from './todo-card.model';
import { Component,
         ElementRef,
         Input,
         OnInit,
         ViewChild,
         ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
   encapsulation: ViewEncapsulation.None
})


export class TodoCardComponent implements OnInit {
    taskCounter

    showCardDrpodownMenu = false;
    showTaskInput = false;    
    
    card: TodoCard;
    // Input Field for the new task
    @ViewChild('inputTaskDetails') inputTaskDetails: ElementRef;
    @Input('todoCard') newCard: TodoCard;

    taskArray: [TodoTask] = [
        new TodoTask( 1, 'Learn Angular 4', false),
        new TodoTask( 2, 'How to tell which card stores wich tasks?', false),
        new TodoTask( 3, 'How to find oldest tasks?', false),
        new TodoTask( 4, 'What is the problem with task group in todo cards?', false),
        new TodoTask( 5, 'Binding to the data property: card & task', false), 
        new TodoTask( 5, 'Create custom directive - event: \'enter pressed \'  ', false),        
    ]



    // card: TodoCard = new TodoCard( 1, "Edit Category Name", 'blue', this.taskArray )

    constructor( private newTaskInput:ElementRef ) { }

    ngOnInit() {
        console.log(" Card title ", this.card);
        this.card = this.newCard;
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


        // replace this with custom event directive
        if(e.which === 13 && e.target.value ) {
            console.log('View Child', );
            taskDescription = this.inputTaskDetails.nativeElement.value;
            // Add new Todo Task Object to the Array
            this.taskArray.unshift( new TodoTask(taskId, taskDescription, false) )
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
