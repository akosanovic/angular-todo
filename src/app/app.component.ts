import { SimpleTodoCardModel } from './shared/simple-todo-card.model';
import { TodoTaskModel } from './shared/todo-task.model';
import { Task } from 'protractor/built/taskScheduler';
import { MainCardService } from './shared/services/main-card.service';
import { TodoTaskComponent } from './todo-card/todo-task/todo-task.component';
import { TodoCardsService } from './shared/services/todo-cards.service';
import { DataStorageService } from './shared/services/data-storage/data-storage.service';
import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';

import 'rxjs/Rx';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss'],

})

export class AppComponent implements OnInit  {
    todoCardCounter:number = 0;

    todoCardArray: SimpleTodoCardModel[] = [];
   
    constructor(    private todoCardService: TodoCardsService ,
                    private dataStorageService: DataStorageService,
                    // Main Card Component
                    private mainCardService: MainCardService,){}

   
    ngOnInit(){

        let todoCards = this.dataStorageService.getCards().subscribe(
            (result:SimpleTodoCardModel[])=>{
                this.todoCardArray = result;
            }
        );            
    }  


    



}
