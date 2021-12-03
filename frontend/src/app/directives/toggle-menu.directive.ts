import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
declare const $: any;
declare const event: any;

@Directive({
  selector: '[data-toggle="sidebar"]',
})
export class ToggleMenuDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // console.log(this.elementRef.nativeElement);
    $(this.elementRef.nativeElement).click(function () {
      event.preventDefault();
      $('.app').toggleClass('sidenav-toggled');
    });
  }
}
