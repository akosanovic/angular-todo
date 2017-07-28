import { SimpleTodoCardModel } from './../shared/simple-todo-card.model';
import { TodoTaskModel } from './../shared/todo-task.model';
import { MainCardService } from './../shared/services/main-card.service';
import { TodoCardsService } from './../shared/services/todo-cards.service';
import { Response } from '@angular/http';
import { DataStorageService } from './../shared/services/data-storage/data-storage.service';
import 'rxjs/Rx';

import { Component, 
         EventEmitter,
         NgModule,
         OnInit, 
         Output, 
         ViewChild, 
         ViewEncapsulation, 
         ElementRef, 
         AfterViewInit } from '@angular/core';




@Component({
    selector     : 'app-main-card',
    templateUrl  : './main-card.component.html',
    styleUrls    : ['./main-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})



export class MainCardComponent implements OnInit {

    oldestTaskArray: TodoTaskModel[] = [];
    floatingButtonsHidden = true;
    noOldTasks: boolean   = true;
    
    cardCounter: number = 0;
    // Outputing events
    @Output() newCardCreated = new EventEmitter<any>();
    
  
   
   
   
    ngOnInit() { }

   constructor(  private mainCardService: MainCardService,
                 private dataStorageService: DataStorageService,
                 private todoCardsService  : TodoCardsService ) {

    this.dataStorageService.getOldestTasks()
        .subscribe(
            (todoTasks: TodoTaskModel[]) =>{
                    this.oldestTaskArray = todoTasks
                    this.checkIfOldTasks();
            }
        )
     


            
        this.checkIfOldTasks();
        console.log("No old tasks", this.noOldTasks)
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
        this.floatingButtonsHidden = true;

        let id    = (new Date()).getTime();
        let color = this.todoCardsService.getCardHeaderColor( id );
        let title = this.todoCardsService.getCardTitle();
       
        let simpleCard = new SimpleTodoCardModel( id, color, title );
       
        this.dataStorageService.storeCard( simpleCard )  
    }

    createNewTask(e){
        e.stopPropagation();

        console.log('create new task');
        this.floatingButtonsHidden = true;
    }
}
