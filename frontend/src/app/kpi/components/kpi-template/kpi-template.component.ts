import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';
import { ItemsKpiService } from 'src/app/shared/services/items-kpi.service';
import { INamekpi } from '../../components/indicator/indicator.interface';

declare const $:any;

@Component({
  selector: 'app-kpi-template',
  templateUrl: './kpi-template.component.html',
  styleUrls: ['./kpi-template.component.css']
})
export class KpiTemplateComponent implements OnInit {

  constructor(
    private IndicatorService:IndicatorService,
    private ItemKpiService:ItemsKpiService,
    private alert:AlertService,
    private formBuilder: FormBuilder,
  ) {
    this.Form = this.formBuilder.group({    
      indi_name_id:['',[Validators.required]],  
      label:['',[Validators.required]],
      objective:['', [Validators.required]],
      formular:['', [Validators.required]],
      txt_a:['', [Validators.required]],
      txt_b:['', [Validators.required]],
      diag_a:['', [Validators.required]],
      diag_b:['', [Validators.required]],
      measure:['', [Validators.required]],
      benchmark:['', [Validators.required]],
      howtooper:['', [Validators.required]],
      ref:['', [Validators.required]],
      active_date:['', [Validators.required]],
      edit_date:['', []],
      edit_note:['', []],
      note:['', []],
      dep_care_id:['', [Validators.required]],
      freq_store_id:['', [Validators.required]],
      status:['', []],
    });
   }

  Form:FormGroup;
  nameKpi:any = "";
  freq_store:any = '';
  depCare:any = '';


  ngOnInit(): void {
    this.loadIndicator();
    
  }
  ngAfterViewInit(){
     $('#indi_name_id').select2();
  }

  onSubmit():void{
    console.log(this.Form.value);    
  }

  loadIndicator():void{
    // ดึงข้อมูลชื่อตัวชี้วัด
    this.IndicatorService.onNameAll().then(result=>{
      console.log(result);      
      this.nameKpi = result
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    });
    // ดึงข้อมูลความถี่ในการจัดเก็บ
    this.ItemKpiService.onFindAllFreqStore().then(result=>{
      this.freq_store = result;      
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    });

    // ดึงข้อมูลผู้รับผิดชอบ
    this.ItemKpiService.findAllDepCare().then(result=>{
      this.depCare = result;      
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    });
  }

}
