import { Component, Input, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { IKpiScoreItem } from 'src/app/shared/interfaces/kpi.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChartService } from 'src/app/shared/services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  
  constructor(
    private chart:ChartService,
    private alert:AlertService
  ) { 
    
  }
  ctx:any;
  data:any[]= [];
  @Input('modalRef') modalRef?: BsModalRef; //รับค่าจาก Component แม่ kpi-score.component.ts
  @Input('itemsKpi') itemsKpi?: IKpiScoreItem; //รับค่าจาก Component แม่ kpi-score.component.ts

  ngOnInit(): void {      
    this.chart.findChart(this.itemsKpi?.id, this.itemsKpi?.year).then(result=>{          
      this.data = result;            
    }).catch(err=>{
      this.alert.someting_wrong(err.errors.error.message);
    });   
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.ctx = <HTMLElement>document.getElementById('line-chart');
    //สร้างการฟ
    const label = this.data.map(e=>e.name_th);
    const data = this.data.map(e=>e.score);
    this.chart.LineChart(this.itemsKpi!, label, data, this.ctx); 
    }, 100);
    
  }


}
