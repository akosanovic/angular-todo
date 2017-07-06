import { TodoTask } from './../todo-task.module';
import { TodoCard } from './../../todo-card/todo-card.model';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TodoCardsService {

    constructor() { }


    todoCards: [TodoCard] = [
        new TodoCard(0, 'yellowCardHeader',    'Every Day', undefined),
        new TodoCard(1, 'turquoiseCardHeader', 'Monthly',   undefined)
    ]

    addTodoCard( cardTitle?:string, taskArray?:[TodoTask] ):void{
        let id: number          = this.getCardID();
        let headerColor: string = this.getCardHeaderColor();
        let title: string       = this.getCardTitle( cardTitle );
        let tasks: [TodoTask]   = this.getTasks(taskArray)


        const newCard = new TodoCard(id, headerColor, title, tasks)
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


    getCardTitle( cardTitle?:string ): string{
        let title: string = cardTitle ? cardTitle : 'Edit Card Title';
        return title;
    }


    getTasks(taskArray){
        let tasks = taskArray ? taskArray : <[TodoTask]>[];
        return tasks;
    }
}
