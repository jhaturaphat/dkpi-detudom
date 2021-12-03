import { Directive, ElementRef } from '@angular/core';

declare const $: any;
declare const event: any;

@Directive({
  selector: '[data-toggle="treeview"]'
})
export class ToggleTreeviewDirective {

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // console.log(this.elementRef.nativeElement);    
    
  }

}
