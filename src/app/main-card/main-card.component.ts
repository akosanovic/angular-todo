
import { Component, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoTask } from '../shared/todo-task.module';
import { TodoCard } from '../todo-card/todo-card.model';



@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit {
    
    todoCardCounter: number = 0;
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
        let newCard: TodoCard;


        let id          = this.todoCardCounter;
        let title       = undefined;
        let headerColor = this.setCardHeaderColor();
        let taskArray   = undefined;

        // let todoCard = new TodoCard(id, headerColor, title, taskArray )
        // console.log( 'CARD', todoCard )
        newCard = new TodoCard( id, headerColor, title, taskArray )
        console.log('EMIT', {id: id, headerColor: headerColor, title: title, taskArray: taskArray} )
        
        this.newCardCreated.emit( newCard )
        this.todoCardCounter ++;

        console.log('create new card, card num', this.todoCardCounter);
        this.hideFloatingButtons = true;
    }



    createNewTask(e){
        e.stopPropagation();
        console.log('create new task');

        this.hideFloatingButtons = true;
    }


    setCardHeaderColor(): string {
        let headerColorClass: string;
        let colorIndex      : number = this.todoCardCounter;

        let cardHeaderColorArray: [string] = [ 
            "yellow",
            "turquoise",
            "purple",
            "blue",
            "orange" ];
        
        let colorArryLength = cardHeaderColorArray.length;
        
        while ( colorIndex > colorArryLength ){
            colorIndex = colorIndex % colorArryLength;
        }
        headerColorClass = `${cardHeaderColorArray[colorIndex]}CardHeader`;
        return headerColorClass;
    }
}
