
import { Component, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoTask } from '../shared/todo-task.module';
import { TodoCard } from '../todo-card/todo-card.model';



@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit {
    
    hideFloatingButtons = true;
    
    @Output() newCardCreated = new EventEmitter<any>();
   
    oldestTaskArray: [TodoTask] = [
        new TodoTask(1, "lorem ipsum", false)
    ]


    // ngClass - binding property
    noOldTasks = this.oldestTaskArray.length <= 0 ? true : false;
    

    constructor() { }
    ngOnInit() {
    }


    toggleFloatingButtons(e) {
        console.log('Show floating buttons - button clicked')
        this.hideFloatingButtons =! this.hideFloatingButtons;
    }


    createNewCard(e){
        e.stopPropagation();
        
        this.newCardCreated.emit()
        console.log('create new card, card num');
        
        this.hideFloatingButtons = true;
    }



    createNewTask(e){
        e.stopPropagation();
        console.log('create new task');

        this.hideFloatingButtons = true;
    }
}
