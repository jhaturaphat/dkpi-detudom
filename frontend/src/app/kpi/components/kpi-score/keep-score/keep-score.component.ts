import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IkpiRangeItem, IKpiScore } from 'src/app/shared/interfaces/kpi.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { KpiRangeItem } from 'src/app/shared/services/KpiRangeItem.server';
import { KpiScoreService } from 'src/app/shared/services/KpiScore.service';

@Component({
  selector: 'app-keep-score',
  templateUrl: './keep-score.component.html',
  styleUrls: ['./keep-score.component.css']
})
export class KeepScoreComponent implements OnInit {

  constructor(
    private KpiScoreService:KpiScoreService,
    private alert:AlertService,
    private KpiRanItService:KpiRangeItem
  ) { }

  @Input('modalRef') modalRef?: BsModalRef; //รับค่าจาก Component แม่ kpi-score.component.ts
  @Input('itemsKpi') itemsKpi?:IKpiScore; //รับค่าจาก Component แม่ kpi-score.component.ts

  itemScore:any[] = []
  itemRange:IkpiRangeItem[] = [];
  ngOnInit(): void {    
    console.log(this.itemsKpi);   
    this.KpiScoreService.findOne(this.itemsKpi?.id, this.itemsKpi?.year).then(result=>{
      this.itemScore = result
      console.log(result);
      
    }).catch(err=>{
      console.log(err.error.errors);    
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    })
  }
  ngAfterViewInit(){
    this.loadRangeItem();
  }

  loadRangeItem(){
    this.KpiRanItService.findAll().then(result =>{
      this.itemRange = result;
      console.log(result);
      
    }).catch(err=> {
      this.alert.someting_wrong(err.error.errors.sqlMessage)
      console.log(err.error.errors);
      
    })
  }

}
