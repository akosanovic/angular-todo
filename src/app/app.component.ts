import { DataStorageService } from './shared/services/data-storage/data-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { TodoCardsService } from './shared/services/todo-cards.service';
import { TodoTask } from './shared/todo-task.module';
import { TodoCard } from './todo-card/todo-card.model';

import "rxjs/Rx";

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss']
})

export class AppComponent implements OnInit {
    todoCardCounter:number = 0;


    @Input() todoCard: TodoCard;
    todoCardArray: TodoCard[] = [];
   
    constructor( private todoCardService: TodoCardsService,
                 private dataStorageService: DataStorageService){ }

    ngOnInit(){
        this.todoCardArray =  this.todoCardService.getCardsArray();
    }    


    // onTodoCardCreated( e ){
    //     console.log( "Todo card created" );
    //     this.todoCardService.addTodoCard();
    //     this.todoCardCounter++;

    // } 

}
