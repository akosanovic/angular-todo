import { Component, OnInit, Input } from '@angular/core';
import { TodoTask } from './shared/todo-task.module';
import { TodoCard } from './todo-card/todo-card.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @Input() todoCard;

    todoCardArray: TodoCard[] = [
        new TodoCard(1, 'yellowCardHeader', 'Every Day', undefined),
        new TodoCard(2, 'turquoiseCardHeader',   'Monthly', undefined)
    ];
    ngOnInit(){

    }


    onTodoCardCreated(todoCard:{id:number, color: string, title: string, todoArray: [TodoTask]}){
        console.log( "Todo card recived", todoCard )
        // let id = todoCard.id;
        // let color = todoCard. color;
        // let title = todoCard.title;
        // let todoArray = todoCard.todoArray;

        
        // console.log("Color class ", color)
        // this.todoCardArray.push( new TodoCard(id, color, title, todoArray) );
    }
  

}
