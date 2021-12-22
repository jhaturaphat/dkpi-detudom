import { Component, OnInit } from '@angular/core';
import { AppUrl, KpiUrl } from '../../../url'
declare const JSsideBar:any;

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {

  constructor() { }

  AppUrl = AppUrl;
  KpiUrl = KpiUrl;

  ngOnInit(): void {
    JSsideBar.loadScript()
  }

}
