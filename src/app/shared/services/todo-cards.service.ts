import { DataStorageService } from './data-storage/data-storage.service';
import { SimpleTodoCardModel } from './../simple-todo-card.model';
import { TodoTaskModel } from './../todo-task.model';
import { MainCardService } from './main-card.service';

import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';



@Injectable()
export class TodoCardsService {

    private cardAddedSubject = new Subject<SimpleTodoCardModel>();
    public cardAdded$ = this.cardAddedSubject.asObservable();


    public cardDeletedSubject = new Subject<number>();
    public cardDeleted$ = this.cardDeletedSubject.asObservable();

    private cardEditSubject = new Subject<SimpleTodoCardModel>();
    public cardEdited$ = this.cardEditSubject.asObservable();



    constructor( private dataStorageService: DataStorageService ) { }

    // Get All Cards on Initial load
    getAllCards(): Observable<SimpleTodoCardModel[]> {
        return this.dataStorageService.getCards().first();
    }


    storeCard( simpleCard: SimpleTodoCardModel ) {

        this.dataStorageService.storeCard( simpleCard )
            .subscribe(
                ( value ) => {
                    this.cardAddedSubject.next( simpleCard );
                }
            )
    }

    editCard( card: SimpleTodoCardModel, cardTitle: string ) {
        this.dataStorageService.editCard( card.id, cardTitle )
            .subscribe(
                ( value: any ) => {
                    card.title = cardTitle
                    return this.cardEditSubject.next( card )
                }
            )

    }

    deleteCard( cardId: number ) {
        this.dataStorageService.deleteCard( cardId )
            .subscribe(
                (value) => {
                    this.cardDeletedSubject.next( cardId )
                }
            )
    }



  
    getCardHeaderColor(id: number):string {
        const colorArray: [string] = [  'yellow', 'turquoise', "purple", "blue", "orange" ];
        
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
