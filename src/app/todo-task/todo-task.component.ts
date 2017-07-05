import { TodoTask } from './../shared/todo-task.module';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss']
})
export class TodoTaskComponent implements OnInit {
  
    @Input('todoTask') task: TodoTask;
  
    constructor() { }

    ngOnInit() {
    }

}
