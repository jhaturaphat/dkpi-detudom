import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IKpiRangeYear, IKpiScoreItem } from 'src/app/shared/interfaces/kpi.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { KpiDepCareService } from 'src/app/shared/services/KpiDepCare.service';
import { KpiRangeYearService } from 'src/app/shared/services/kpiRangeYear.service';
import { KpiScoreService } from 'src/app/shared/services/KpiScore.service'
import { IDepcare } from '../depcare/depcare.interface';

@Component({
  selector: 'app-kpi-score',
  templateUrl: './kpi-score.component.html',
  styleUrls: ['./kpi-score.component.css']
})
export class KpiScoreComponent implements OnInit {
  constructor(
    private yearService:KpiRangeYearService,
    private scoreService:KpiScoreService,
    private modalService: BsModalService,
    private alert: AlertService,
    private depCareService:KpiDepCareService
  ) { }

  modalRef?: BsModalRef;
  year:IKpiRangeYear[] = []  
  yearDopdown:any = {
    id:'',
    text:'ปีงบประมาณ'
  };
  depCareDopdown:any = {
    id:'',
    text:'หน่วยงานผู้รับผิดชอบ'
  }
  kpiScore:IKpiScoreItem[] = [];
  itemsKpi?:IKpiScoreItem;
  depCare:IDepcare[] = []
  


  ngOnInit(): void {

    this.dropdownYear();
    this.kpiDepCare();

    // ดึงข้อมูล Kpi template มาแสดงที่ตาราง จัดเก็บ KPI Score    
    this.yearDopdown.id =  new Date(Date.now()).getFullYear().toString();
    this.kpiScoreYear(this.yearDopdown.id);
  }

  // ดึงข้อมูล ปี มาแสดง Dorpdown ปีงบประมาณ
  dropdownYear():void{    
    this.yearService.findAll().then(result => {
      this.year = result;
    }).catch((err)=>{
      this.alert.someting_wrong(err.error)
      console.log(err);   
    });
  }

  kpiScoreYear(year?:string){
    if(this.depCareDopdown.id) {
      this.scoreService.findAll(year, this.depCareDopdown.id).then(result=>{
        this.kpiScore = result; 
      }).catch(err=>{
        console.log(err.error);      
      })
    } else{
      this.scoreService.findAll(year).then(result=>{
        this.kpiScore = result; 
      }).catch(err=>{
        console.log(err.error);      
      })
    } 
    
  }

  kpiSearchYear(item:IKpiRangeYear){    
    this.yearDopdown.id = item.year_id;     
    this.kpiScoreYear(item.year_id);
  }

  setDepcare(item:any){
    this.depCareDopdown.id = item.id
    this.depCareDopdown.text = item.name_th   
    
    this.kpiScoreYear(this.yearDopdown.id);
    
  }

  kpiDepCare():void{
    this.depCareService.findAll().then(result=>{
      this.depCare = result;
    }).catch(err=>{
      console.log(err);  
      this.alert.someting_wrong("โปรแกรมดึงข้อมูลตาราง dep_care ไม่ได้")    
    })
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
