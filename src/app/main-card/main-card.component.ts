import { Component, OnInit, NgModule } from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit {

    hideFloatingButtons = true;
    oldestTasksArray: [any];
    
    constructor() { }
    ngOnInit() {
    }
    
    toggleFloatingButtons(e) {
        console.log('Show floating buttons - button clicked')
        this.hideFloatingButtons = !this.hideFloatingButtons;
    }
    createNewCard(e){
        e.stopPropagation();
        console.log('create new card');
    }
    createNewTask(e){
        e.stopPropagation();
        console.log('create new task');
    }
}
