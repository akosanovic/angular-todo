import { DataStorageService } from './../../shared/services/data-storage/data-storage.service';
import { TodoCardsService } from './../../shared/services/todo-cards.service';
import { TodoTaskService } from './../../shared/services/todo-task.service';
import { TodoTaskModel } from './../../shared/todo-task.model';

import 'rxjs/Rx';
import { Component, ElementRef, Input, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';




@Component({
    selector   : 'app-todo-task',
    templateUrl: './todo-task.component.html',
    styleUrls  : ['./todo-task.component.scss'],
})

export class TodoTaskComponent implements OnInit {
  
    @Input('todoTask') task: TodoTaskModel;
    
    // TodoTask Description Input
    @ViewChild('todoTaskInput') taskDescriptionInput: ElementRef

    taskChecked:boolean = false;    
    randomTaskNumber: number = this.genarateRandomNumber();
    // Property Binding
    showTaskDrpodownMenu: boolean = false;
    taskDescriptionDisabled = true;




    constructor( private todoTaskService: TodoTaskService,
                 private todoCardService: TodoCardsService,
                 private dataStorageService: DataStorageService) {}
    

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

    // Dropdown Menu
    toggleTaskDropdownMenu(){
        this.showTaskDrpodownMenu = !this.showTaskDrpodownMenu;
    }
    closeDropdownMenu(){
        this.showTaskDrpodownMenu = false;
    }

    // Input Task Description
    enableTaskDescriptionChange(e){
        e.stopPropagation();
        this.taskDescriptionDisabled = false;
        this.taskDescriptionInput.nativeElement.focus();
        this.closeDropdownMenu();
    }
    disableTaskDescription(){
        this.taskDescriptionDisabled = true;
    }
    onTaskDescriptionChange(){
        let description = this.taskDescriptionInput.nativeElement.value;
        this.todoCardService.editTodoTask( this.task, description  )
        this.disableTaskDescription();
        this.dataStorageService.storeData();
    }
    deleteTask(e) {
         e.stopPropagation();
        
        console.log(`Delete todo Task `, this.task);
        this.todoCardService.deleteTodoTask(this.task);
        this.dataStorageService.storeData()                
    }
}
