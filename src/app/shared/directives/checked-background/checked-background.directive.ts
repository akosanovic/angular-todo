import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[appCheckedBackground]'
})
export class CheckedBackgroundDirective implements OnInit {

    taskItem: HTMLElement;
    

    @HostListener('click') checkboxClicked() {
        this.taskItem.style.backgroundColor = '#f6f9ff';
    }

    constructor( private inputElement: ElementRef ) { }
   
    ngOnInit(){
        this.taskItem = this.inputElement.nativeElement
    }

}
