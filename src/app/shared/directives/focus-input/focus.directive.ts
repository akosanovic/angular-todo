import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit{

  constructor( private elementRef: ElementRef, private renderer: Renderer2 ) {
     console.log('Native element with custom directive ', elementRef.nativeElement )
   }
   ngOnInit(){
     let newTaskInput = this.elementRef.nativeElement;
     newTaskInput.focus();
    }
   
 
}
