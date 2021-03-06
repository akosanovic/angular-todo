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





    ngOnInit() {
        this.mainCardService.getOldestTasks()
            .subscribe(
                (oldestTaskArray: TodoTaskModel[]) => {
                    this.oldestTaskArray = oldestTaskArray;
                    this.checkIfOldTasks();
                }
            )
    }

   constructor(  private mainCardService   : MainCardService,
                 private dataStorageService: DataStorageService,
                 private todoCardsService  : TodoCardsService ) {

        this.checkIfOldTasks();
    }





    checkIfOldTasks() {
        if (this.oldestTaskArray.length <= 0) {
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

    hideFloatingButtons() {
        this.floatingButtonsHidden = true;
    }




    createNewCard(e) {
        e.stopPropagation();
        this.floatingButtonsHidden = true;

        const id    = (new Date()).getTime();
        const color = this.todoCardsService.getCardHeaderColor( id );
        const title = this.todoCardsService.getCardTitle();

        const simpleCard = new SimpleTodoCardModel( id, color, title );

        this.todoCardsService.storeCard( simpleCard )
    }

    createNewTask(e) {
        e.stopPropagation();

        console.log('create new task');
        this.floatingButtonsHidden = true;
    }
}
