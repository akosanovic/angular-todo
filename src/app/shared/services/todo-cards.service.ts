import { SimpleTodoCardModel } from './../simple-todo-card.model';
import { TodoTaskModel } from './../todo-task.model';
import { MainCardService } from './main-card.service';

import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';




@Injectable()
export class TodoCardsService {

  

    constructor( ) { }






  

  

    
    getCardHeaderColor(id: number):string {
        const colorArray: [string] = [  "yellow", "turquoise", "purple", "blue", "orange" ];
        
        let colorArrayLenth:number = colorArray.length;
       
        if ( id >= colorArrayLenth){ 
            id = id % colorArrayLenth;
        }
        let colorArrayHeader = colorArray[id]+'CardHeader'
        return colorArrayHeader;
    }
    getCardTitle( cardTitle?:string ): string{
        let title: string = cardTitle ? cardTitle : 'Edit Card Title';
        return title;
    }
    statusChangeTodoTask( task:TodoTaskModel, status:boolean ){

    }


    
}
