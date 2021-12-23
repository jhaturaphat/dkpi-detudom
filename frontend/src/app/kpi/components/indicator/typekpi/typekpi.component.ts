import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';
import { IGroupkpi } from '../groupkpi/groupkpi.interface';

@Component({
  selector: 'app-typekpi',
  templateUrl: './typekpi.component.html',
  styleUrls: ['./typekpi.component.css']
})
export class TypekpiComponent implements OnInit {

  
  constructor(
    private service:IndicatorService,
    private alert:AlertService
  ) { }

  public groupItmes?:IGroupkpi;

  ngOnInit(): void {
    this.service.onGroupAll().then((result)=>{
      this.groupItmes = result;
      console.log(this.groupItmes);      
    });


  }  

}
