import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

declare const $: any;
declare const event: any;
declare const JSsideBar: any;

@Directive({
  selector: '[data-toggle="treeview"]'
})
export class ToggleTreeviewDirective {

  constructor(private elementRef: ElementRef) { }
  // @HostBinding('class.is-expanded') isActive = false;  
  @HostListener('document:click', ['$event.target']) onClick(target: Event) {     
    
    
  }

  ngOnInit() {       
    // $(this.elementRef.nativeElement).click(function () {
    //   event.preventDefault();
    //   $('.treeview').toggleClass('is-expanded');
    // });
  }
}
