import { Directive, OnInit } from '@angular/core';

// Detects if there was click on the document
// If document clicked - is target closest [element-directive-is-placed-on] > 0 - was it clicked on element



@Directive({
  selector: '[click-outside-close]'
})
export class ClickOutsideCloseDirective implements OnInit {



    constructor() { }
    ngOnInit(){}
  
}
