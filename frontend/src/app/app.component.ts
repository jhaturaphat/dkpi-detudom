import { Component, OnInit } from '@angular/core';

declare const JSsideBar:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'forntend';
 
  ngOnInit() {
    JSsideBar.loadScript()
  }
}
