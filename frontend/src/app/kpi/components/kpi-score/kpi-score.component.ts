import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IKpiRangeYear, IKpiScoreItem } from 'src/app/shared/interfaces/kpi.interface';
import { KpiRangeYearService } from 'src/app/shared/services/kpiRangeYear.service';
import { KpiScoreService } from 'src/app/shared/services/KpiScore.service'

@Component({
  selector: 'app-kpi-score',
  templateUrl: './kpi-score.component.html',
  styleUrls: ['./kpi-score.component.css']
})
export class KpiScoreComponent implements OnInit {

  constructor(
    private yearService:KpiRangeYearService,
    private scoreService:KpiScoreService,
    private modalService: BsModalService
  ) { }

  modalRef?: BsModalRef;
  year:IKpiRangeYear[] = []  
  year_id:string = 'ปีงบประมาณ';
  kpiScore:IKpiScoreItem[] = [];
  itemsKpi?:IKpiScoreItem;


  ngOnInit(): void {
    // ดึงข้อมูล ปี มาแสดง Dorpdown ปีงบประมาณ
    this.yearService.findAll().then(result => {
      this.year = result;
    });

    // ดึงข้อมูล Kpi template มาแสดงที่ตาราง จัดเก็บ KPI Score
    const year = new Date(Date.now()).getFullYear().toString(); 
    this.kpiScoreYear(year);
  }


  kpiScoreYear(year?:string){
    this.scoreService.findAll(year).then(result=>{
      this.kpiScore = result;
      console.log(result);
      
    }).catch(err=>{
      console.log(err.error.errors);      
    })
  }

  kpiSearchYear(item:IKpiRangeYear){    
    this.year_id = item.year_id + 543;    
    this.kpiScoreYear(item.year_id);
  }

  openModal(template: TemplateRef<any>, item:IKpiScoreItem) {
    this.itemsKpi = item;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
      );
    
  }
  openChartModal(template: TemplateRef<any>, item:any) {
    this.itemsKpi = item;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
      );
    
  }
}
