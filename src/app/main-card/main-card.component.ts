import { TodoTask } from './../shared/todo-task.module';
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

    oldestTaskArray: TodoTask[] = [];
    floatingButtonsHidden = true;
   
    // Outputing events
    @Output() newCardCreated = new EventEmitter<any>();
    
   noOldTasks: boolean = false;





    constructor( private mainCardService: MainCardService,
                 private dataStorageService: DataStorageService,
                 private todoCardsService  : TodoCardsService ) {}
    
    ngOnInit() {
        this.oldestTaskArray = this.mainCardService.oldestTaskArray;
        this.noOldTasks      = this.oldestTaskArray.length <= 0 ? true : false;
       
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
        this.dataStorageService.storeData()
            .subscribe(
                (response: Response ) => {
                    console.log('Data Stored to Firebase', response);
                },
                (error) => {
                    console.log( "Error occured", error );
                }
            );
    }



    createNewTask(e){
        e.stopPropagation();
        console.log('create new task');

        this.floatingButtonsHidden = true;
    }
}
