import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IkpiRangeItem, IKpiRangeYear, IKpiScore, IKpiScoreItem } from 'src/app/shared/interfaces/kpi.interface';
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
    private formBuilder:FormBuilder,
    private renderer: Renderer2
  ) { 
    // สร้างฟอร์ม
    this.form = formBuilder.group({
      kpi_range_item_id:['',[Validators.required]],
      score:['',[Validators.required]],
      score_unit:['', [Validators.required]]      
    });
  }

  @Input('modalRef') modalRef?: BsModalRef; //รับค่าจาก Component แม่ kpi-score.component.ts
  @Input('itemsKpi') itemsKpi?:IKpiScoreItem; //รับค่าจาก Component แม่ kpi-score.component.ts
  @Input('year_id') year_id?:any;

  @ViewChild('formscore', { static: true }) formscore?:ElementRef; 


  form:FormGroup;
  itemScore:any;
  itemRange:IkpiRangeItem[] = [];

// เริ่มต้นฟอร์ม
  ngOnInit(): void {    
    console.log(this.itemsKpi);   
    this.KpiScoreService.findOne(this.itemsKpi?.id, this.itemsKpi?.year).then(result=>{
      this.itemScore = result
      this.checkRange(result);
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
      //console.log('โหลด item kpi',result);      
    }).catch(err=> {
      this.alert.someting_wrong(err.error.errors.sqlMessage)
      console.log(err.error.errors);      
    });
  }

  onSubmit(){    
    if(!this.form.valid) return this.alert.someting_wrong('ข้อมูลกรอกมาไม่ครบ');     
    const value = this.form.value;    
    value.kpi_tpl_id = this.itemsKpi?.id;
    value.year = this.itemsKpi?.year;
    value.kpi_condition_id = this.itemsKpi?.kpi_condition_id;
    value.target_score = this.itemScore[0].target_score;
    value.kpi_range_year_year_id = this.itemsKpi?.year;
    console.log(value);    
    this.KpiScoreService.save(value).then(result => {
      console.log(result);
      this.alert.notify('บันทึกสำเร็จ');
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    })
  }
    
  onEdit(item:any){

  }

  checkRange(item:any[]):any{
    let el = this.formscore?.nativeElement; 
    if(item.length == 12) return 'd-none';
    if(item.length == 4) return 'd-none';
    if(item.length == 1) return 'd-none';
  }

}
