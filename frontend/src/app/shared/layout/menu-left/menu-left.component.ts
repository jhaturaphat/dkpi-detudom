import { Component, OnInit } from '@angular/core';

declare const JSsideBar:any;

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    JSsideBar.loadScript()
  }

}
