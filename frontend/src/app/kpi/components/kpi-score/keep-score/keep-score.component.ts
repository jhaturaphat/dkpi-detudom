import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IkpiRangeItem, IKpiScoreItem } from 'src/app/shared/interfaces/kpi.interface';
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
    private KpiRanItService:KpiRangeItem,
    formBuilder:FormBuilder
  ) { 
    // สร้างฟอร์ม
    this.form = formBuilder.group({
      kpi_range_item_id:['',[Validators.required]],
      score:['',[Validators.required]],      
    });
  }

  @Input('modalRef') modalRef?: BsModalRef; //รับค่าจาก Component แม่ kpi-score.component.ts
  @Input('itemsKpi') itemsKpi?:IKpiScoreItem; //รับค่าจาก Component แม่ kpi-score.component.ts

  form:FormGroup;
  itemScore:any[] = []
  itemRange:IkpiRangeItem[] = [];

// เริ่มต้นฟอร์ม
  ngOnInit(): void {    
    console.log(this.itemsKpi);   
    this.KpiScoreService.findOne(this.itemsKpi?.id, this.itemsKpi?.year).then(result=>{
      this.itemScore = result
      console.log('itemScore',result);
      
    }).catch(err=>{
      console.log(err.error.errors);    
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    })
  }
  // โหลด ข้อมูลหลัง สร้าง element เสร็จ
  ngAfterViewInit(){
    this.loadRangeItem();
  }
// โหลด item kpi
  loadRangeItem(){
    this.KpiRanItService.findAll().then(result =>{
      this.itemRange = result;
      console.log('โหลด item kpi',result);      
    }).catch(err=> {
      this.alert.someting_wrong(err.error.errors.sqlMessage)
      console.log(err.error.errors);      
    });
  }

  onSubmit(){
    if(!this.form.valid) return this.alert.someting_wrong();     
    const value = this.form.value;
    value.symbol_id = this.itemScore[0].symbol_id; //เพิ่มเงื่อนไข
    console.log(value);
  }
  
  onEdit(item:any){

  }

}
