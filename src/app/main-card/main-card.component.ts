import { TodoCardsService } from './../shared/services/todo-cards.service';
import { Response } from '@angular/http';
import {  Component,
          EventEmitter,
          NgModule,
          OnInit,
          Output,
          Renderer2,
          ViewChild, 
          ElementRef } from '@angular/core';

import { DataStorageService } from './../shared/services/data-storage/data-storage.service';

import { TodoTask } from '../shared/todo-task.module';
import { TodoCard } from '../todo-card/todo-card.model';

import 'rxjs/Rx';


@Component({
  selector   : 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls  : ['./main-card.component.scss']
})



export class MainCardComponent implements OnInit {
    
     constructor( private renderer2: Renderer2, 
                 private dataStorageService: DataStorageService,
                 private todoCardsService: TodoCardsService ) {}
    ngOnInit() {
    }

    floatingButtonsHidden = true;
    // Outputing events
    @Output() newCardCreated = new EventEmitter<any>();
   
   
    oldestTaskArray: [TodoTask] = [
        new TodoTask(1, "lorem ipsum", false)
    ]
    // ngClass - binding property
    noOldTasks = this.oldestTaskArray.length <= 0 ? true : false;
    

   

    
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
        this.todoCardsService.createTodoCard();

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
