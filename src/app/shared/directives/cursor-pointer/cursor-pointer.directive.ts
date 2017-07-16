import { Directive, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[cursor-pointer-d]'
})
export class CursorPointerDirective implements OnInit {
  element;

  constructor( private elRefer: ElementRef, 
               private renderer: Renderer2 ) { }
  ngOnInit(){
    this.element = this.elRefer.nativeElement;
  }
  @HostListener('mouseenter') mouseover ( e? : Event ) {
      this.renderer.setStyle(this.element, 'cursor', 'pointer');
  }

}
