import { Component, OnInit, Input } from '@angular/core';
import { TodoCardsService } from './shared/services/todo-cards.service';
import { TodoTask } from './shared/todo-task.module';
import { TodoCard } from './todo-card/todo-card.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    todoCardCounter:number = 0;

    @Input() todoCard: TodoCard;
    todoCardArray: TodoCard[] = [];
   
    constructor( private todoCardService: TodoCardsService ){ }
    ngOnInit(){
        this.todoCardArray = this.todoCardService.todoCards;
    }    


    onTodoCardCreated( e ){
        console.log( "Todo card created" );
        this.todoCardService.addTodoCard();
        this.todoCardCounter++;
    }
  

}
