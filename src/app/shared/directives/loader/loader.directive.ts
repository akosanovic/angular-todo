import { Directive, HostBinding, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[loadDirective]'
})
export class LoaderDirective {
  @HostBinding('class.loading') loading: boolean = false;
  
  @Input() set showLoader( loaderVisible: boolean ){
    this.loading = loaderVisible;
  }

  constructor() { 
  }




}
