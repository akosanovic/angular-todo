import { TodoTask } from './../todo-task.module';
import { TodoCard } from './../../todo-card/todo-card.model';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TodoCardsService {

    constructor( private cardTitle?, private taskArray? ) { }


    todoCards: [TodoCard] = [
        new TodoCard(0, 'yellowCardHeader', 'Every Day', undefined),
        new TodoCard(1, 'turquoiseCardHeader',   'Monthly', undefined)
    ]

    addTodoCard():void{
        let id: number            = this.getCardID();
        let headerColor: string   = this.getCardHeaderColor();
        let title: string         = this.getCardTitle();
        let taskArray: [TodoTask] = this.getTasks()


        const newCard = {id, headerColor, title, taskArray}
        this.todoCards.push( newCard );
        console.log("Todo Card created", newCard)
    }

    getCardID():number{
        return this.todoCards.length;
    }


    getCardHeaderColor():string {
        const colorArray: [string] = [  "yellow", "turquoise", "purple", "blue", "orange" ];
        
        let colorArrayLenth:number = colorArray.length;
        let cardsArrayLenth:number = this.todoCards.length;
        if (cardsArrayLenth >= cardsArrayLenth){
            cardsArrayLenth = cardsArrayLenth % colorArrayLenth;
        }
        let colorArrayHeader = colorArray[cardsArrayLenth]+'CardHeader'
        return colorArrayHeader;
    }


    getCardTitle(): string{
        let title: string = this.cardTitle ? this.cardTitle : 'Edit Card Title';
        return title;
    }


    getTasks(){
        let tasks = this.taskArray ? this.taskArray : []<[TodoTask]>;
        return tasks;
    }
}
