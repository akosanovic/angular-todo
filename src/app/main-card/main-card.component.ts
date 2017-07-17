import { TodoTaskModel } from './../shared/todo-task.model';
import { MainCardService } from './../shared/services/main-card.service';
import { TodoCardsService } from './../shared/services/todo-cards.service';
import { Response } from '@angular/http';
import { DataStorageService } from './../shared/services/data-storage/data-storage.service';
import 'rxjs/Rx';

import {  Component, EventEmitter, NgModule, OnInit,  Output, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';




@Component({
    selector     : 'app-main-card',
    templateUrl  : './main-card.component.html',
    styleUrls    : ['./main-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})



export class MainCardComponent implements OnInit {

    oldestTaskArray = [];
    floatingButtonsHidden = true;
    noOldTasks: boolean = true;
    // Outputing events
    @Output() newCardCreated = new EventEmitter<any>();
    
  
   
   
   
   
   constructor(  private mainCardService: MainCardService,
                 private dataStorageService: DataStorageService,
                 private todoCardsService  : TodoCardsService ) {}
    
    ngOnInit() {
        this.todoCardsService.getTodoTasks();
        // TodoTask Observable
        this.todoCardsService.todoTaskObservable
            .subscribe(
                (todoTask: TodoTaskModel[]) => {
                    console.log('new todoTask', todoTask)
                    this.oldestTaskArray = todoTask;
                    this.checkIfOldTasks();
                }
            )


            
        this.checkIfOldTasks();
        console.log("No old tasks", this.noOldTasks)
        // setTimeout(
        //     () => {
        //         this.oldestTaskArray = this.todoCardsService.getTodoTasks();
        //         console.log('Main card Oldest task array, ', this.oldestTaskArray)
        //     }, 1000
        // )
    }
    
    checkIfOldTasks(){
        if(this.oldestTaskArray.length <= 0){
            this.noOldTasks = true;
        }
        else{
            this.noOldTasks = false;
            console.log('Oldest task array then', this.oldestTaskArray.length)
        }
    }

    
    toggleFloatingButtons(e) {
        e.stopPropagation();

        console.log('Show floating buttons - button clicked')
        this.floatingButtonsHidden = !this.floatingButtonsHidden;
    }
    hideFloatingButtons(){
        this.floatingButtonsHidden = true;
    }




    createNewCard(e){
        e.stopPropagation();
        
        // this.newCardCreated.emit()
        this.todoCardsService.addTodoCard();
        this.floatingButtonsHidden = true;
        this.dataStorageService.storeData();
    }



    createNewTask(e){
        e.stopPropagation();
        console.log('create new task');

        this.floatingButtonsHidden = true;
    }
}
