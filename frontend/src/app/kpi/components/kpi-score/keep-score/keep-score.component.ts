import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IkpiRangeItem, IKpiScoreItem, IKpiUnit } from 'src/app/shared/interfaces/kpi.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { KpiRangeItem } from 'src/app/shared/services/KpiRangeItem.server';
import { KpiScoreService } from 'src/app/shared/services/KpiScore.service';
import { KpiUnitService } from 'src/app/shared/services/KpiUnit.service';

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
    private formBuilder:FormBuilder,
    private KpiUnit:KpiUnitService
  ) { 
    // สร้างฟอร์ม
    this.formG = this.formBuilder.group({
      kpi_range_item_id:['',[Validators.required]],
      score:['',[Validators.required]],
      target_score:['',[Validators.required]],
      score_unit_id:['', [Validators.required]]      
    });
  }

  @Input('modalRef') modalRef?: BsModalRef; //รับค่าจาก Component แม่ kpi-score.component.ts
  @Input('itemsKpi') itemsKpi?:IKpiScoreItem; //รับค่าจาก Component แม่ kpi-score.component.ts
  @Input('year_id') year_id?:any;

  @ViewChild('formscore', { static: true }) formscore?:ElementRef; 

  id:any = 0;
  formStatus:boolean = false;
  formG:FormGroup;
  itemScore:any;
  itemRange:IkpiRangeItem[] = [];
  kpiUnit:IKpiUnit[] = [];
// เริ่มต้นฟอร์ม
  ngOnInit(): void {    
    console.log('itemsKpi',this.itemsKpi);   
    this.loadScore();
  }

  loadScore(){
    this.KpiScoreService.findOne(this.itemsKpi?.id, this.itemsKpi?.year).then(result=>{
      this.itemScore = result      
      console.log('itemScore',result);      
    }).catch(err=>{
      console.log(err.error.errors);    
      this.alert.someting_wrong(err.error);
    })
  }

  // โหลด ข้อมูลหลัง สร้าง element เสร็จ
  ngAfterViewInit(){
    this.loadRangeItem();
    this.loadKpiUnit();
  }
// โหลด item kpi
  loadRangeItem(){
    this.KpiRanItService.findAll(this.itemsKpi?.frequency_id).then(result =>{
      this.itemRange = result;
      //console.log('โหลด item kpi',result);      
    }).catch(err=> {
      this.alert.someting_wrong(err.error)
      console.log(err.error.errors);      
    });
  }

  // ดึงข้อมูลหน่วยนับ
  loadKpiUnit(){
    this.KpiUnit.findAll().then(result => {
      this.kpiUnit = result;
    }).catch(err=> {
      this.alert.someting_wrong(err.error)
      console.log(err);      
    });
  }

  onSubmit(){    
    if(!this.formG.valid) return this.alert.someting_wrong('ข้อมูลกรอกมาไม่ครบ');     

    const value = this.formG.value;    
    value.kpi_tpl_id = this.itemsKpi?.id;
    value.year = this.itemsKpi?.year;
    value.kpi_condition_id = this.itemsKpi?.kpi_condition_id;
    // value.target_score = this.itemScore[0].target_score | 100;  //กำหนดค่าเริ่มต้นเป็น 100 คะแนน
    value.kpi_range_year_year_id = this.itemsKpi?.year;

    if(this.formStatus){
      this.KpiScoreService.update(this.id, value).then(result => {      
        this.loadScore();
        this.loadRangeItem();
        this.alert.notify('แก้ไขสำเร็จ');
      }).catch(err=>{
        console.error(err.error);
        this.alert.someting_wrong(err.error);
      });
    }else{
      this.KpiScoreService.save(value).then(result => {      
        this.loadScore();
        this.loadRangeItem();
        this.alert.notify('บันทึกสำเร็จ');
      }).catch(err=>{
        console.error(err.error);
        this.alert.someting_wrong(err.error);
      });
    }

    

  }
    
  onEdit(item:any){  
    console.log(item);
      
    this.formStatus = true;
    const form = this.formG;
    this.id = item.id;
    form.controls['kpi_range_item_id'].setValue(item.kri_id);
    form.controls['score'].setValue(item.score);
    form.controls['target_score'].setValue(item.target_score);
    form.controls['score_unit_id'].setValue(item.score_unit_id);
  }

  onChange(deviceValue:any) {
    console.log(deviceValue);
  }

  checkRange(item:any[]):any{
    let el = this.formscore?.nativeElement; 
    if(item.length == 12) return 'd-none';
    if(item.length == 4) return 'd-none';
    if(item.length == 1) return 'd-none';
  }

}
