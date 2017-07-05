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

    @Input() todoCard;
    todoCardArray: [TodoCard];
   
    constructor( private todoCardService: TodoCardsService ){ }
    ngOnInit(){

        this.todoCardArray = this.todoCardService.todoCards;
    }    


    onTodoCardCreated( todoCard:{id:number, headerColor: string, title: string, todoArray: [TodoTask]}){
        console.log( "Todo card recived", todoCard )

        let id        = todoCard.id;
        let color     = todoCard. headerColor;
        let title     = todoCard.title;
        let todoArray = todoCard.todoArray;

        console.log("Color class ", todoCard.headerColor)
        this.todoCardArray.push( new TodoCard(id, color, title, todoArray) );
    }
  

}
