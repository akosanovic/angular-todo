import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[cursor-pointer-d]'
})
export class CursorPointerDirective implements OnInit {
  element;
  @HostBinding('style.cursor') cursor: string;


  constructor( private elRefer: ElementRef, 
               private renderer: Renderer2 ) { }
  ngOnInit(){
    this.element = this.elRefer.nativeElement;
  }

  @HostListener('mouseenter') mouseover ( e? : Event ) {
      this.cursor = 'pointer';
      // this.renderer.setStyle(this.element, 'cursor', 'pointer');
  }

}
