
import { Component, EventEmitter, NgModule, OnInit, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { TodoTask } from '../shared/todo-task.module';
import { TodoCard } from '../todo-card/todo-card.model';



@Component({
  selector   : 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls  : ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit {
    
    floatingButtonsHidden = true;
    @ViewChild("floatingButtonsContainer") floatingButtonsContainer: ElementRef;
    
    // Outputing events
    @Output() newCardCreated = new EventEmitter<any>();
   
   
    oldestTaskArray: [TodoTask] = [
        new TodoTask(1, "lorem ipsum", false)
    ]


    // ngClass - binding property
    noOldTasks = this.oldestTaskArray.length <= 0 ? true : false;
    

    constructor( private renderer2: Renderer2 ) { }
    ngOnInit() {
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
        
        this.newCardCreated.emit()
        console.log('create new card, card num');

        this.floatingButtonsHidden = true;
    }



    createNewTask(e){
        e.stopPropagation();
        console.log('create new task');

        this.floatingButtonsHidden = true;
    }


    // onClick() {

    //     console.log("parent click");
    //     this.renderer2.addClass( this.floatingButtonsContainer.nativeElement, "hideFloatingButtons" );

    //     debugger        
    // }
}
