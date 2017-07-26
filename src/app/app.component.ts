import { TodoTaskModel } from './shared/todo-task.model';
import { Task } from 'protractor/built/taskScheduler';
import { MainCardService } from './shared/services/main-card.service';
import { TodoTaskComponent } from './todo-card/todo-task/todo-task.component';
import { TodoCardsService } from './shared/services/todo-cards.service';
import { DataStorageService } from './shared/services/data-storage/data-storage.service';
import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { TodoCardModel } from './todo-card/todo-card.model';

import 'rxjs/Rx';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss'],

})

export class AppComponent implements OnInit  {
    todoCardCounter:number = 0;

    todoCardArray: TodoCardModel[] = [];
   
    constructor(    private todoCardService: TodoCardsService ,
                    private dataStorageService: DataStorageService,
                    // Main Card Component
                    private mainCardService: MainCardService,

                    // Dynamically adding Component
                    private viewContainerRef: ViewContainerRef,
                    private componentFactoryResolver: ComponentFactoryResolver){}

   
    ngOnInit(){
        this.dataStorageService.getData();

        this.todoCardService.todoCardsObservable
            .subscribe(
                (todoCards : TodoCardModel[]) => {
                    
                    this.todoCardsLoaded( todoCards)
                }
            )
        this.todoCardService.todoCardsObservable;        
    }  


    todoCardsLoaded( todoCards ){

        if (todoCards){
            this.todoCardArray = todoCards;

            let tasks: TodoTaskModel[] = [];
            this.todoCardArray.forEach( (elem) => {
                
                tasks = tasks.concat( elem.taskArray );
            } );
            this.todoCardService.todoTaskObservable.next( tasks );
        }
        else {
            this.todoCardArray = [];
        }
    }


    todoCardDeleted(  ){

    }



}
