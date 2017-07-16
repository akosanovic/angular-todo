import { TodoCardsService } from './shared/services/todo-cards.service';
import { DataStorageService } from './shared/services/data-storage/data-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { TodoCardModel } from './todo-card/todo-card.model';

import 'rxjs/Rx';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss'],

})

export class AppComponent implements OnInit {
    todoCardCounter:number = 0;

    todoCardArray: TodoCardModel[] = [];
   
    constructor( private todoCardService: TodoCardsService ,
                 private dataStorageService: DataStorageService){ }

    ngOnInit(){
        // this.todoCardArray =  this.todoCardService.getCardsArray();

        this.dataStorageService.getData();

        this.todoCardService.todoCardsObservable
             .subscribe(
                 (todoCards? : TodoCardModel[]) => {
                     if (todoCards){
                        this.todoCardArray = todoCards;
                     }
                    else {
                        this.todoCardArray = [];
                    }
                     
                 }
             )
        this.todoCardService.todoCardsObservable;
    }   
}
