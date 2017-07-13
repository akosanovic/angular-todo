import { TodoTaskService } from './../shared/services/todo-task.service';
import { TodoTask } from './../shared/todo-task.module';
import { TaskScheduler } from 'protractor/built/taskScheduler';
import { Component, 
        Input,
        OnInit, 
        ViewEncapsulation } from '@angular/core';


@Component({
    selector   : 'app-todo-task',
    templateUrl: './todo-task.component.html',
    styleUrls  : ['./todo-task.component.scss'],
})

export class TodoTaskComponent implements OnInit {
  
    @Input('todoTask') task: TodoTask;
    
    taskChecked:boolean = false;

    randomTaskNumber: number = this.genarateRandomNumber();
   
    constructor( private todoTaskService: TodoTaskService) {}
    

    ngOnInit() {
       this.taskChecked = this.task.checked;
       console.log("Task Checked", this.taskChecked)
    }


    // required for the custom checkbox
    genarateRandomNumber(): number{
        let number = Math.floor(Math.random()*100);
        return number;
    }
    
    todoTaskStatusChanged(){
        console.log('Task Status Changed');
        this.taskChecked = !this.taskChecked;

        this.todoTaskService.onTaskStatusChange( this.task['id'], this.taskChecked );
    }
}
