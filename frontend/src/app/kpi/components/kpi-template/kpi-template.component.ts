import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IKpiTpl } from 'src/app/shared/interfaces/kpi.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';
import { ItemsKpiService } from 'src/app/shared/services/items-kpi.service';
import { KpiTemplateService } from 'src/app/shared/services/kpiTemplate.service';
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
    private service:KpiTemplateService,
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
      diag_a:['', []],
      diag_b:['', []],
      measure:['', [Validators.required]],
      benchmark:['', []],
      howtooper:['', [Validators.required]],
      ref:['', [Validators.required]],
      active_date:['', [Validators.required]],
      edit_date:['', []],
      edit_note:['', []],
      note:['', []],
      dep_care_id:['', [Validators.required]],
      freq_store_id:['', [Validators.required]],
      status:['', [Validators.required]],
    });
   }

  Form:FormGroup;
  nameKpi:any = "";
  freq_store:any = '';
  depCare:any = '';
  ListkpiTpl:IKpiTpl[] = [];
  FormState:boolean = false;

  ngOnInit(): void {
    this.loadIndicator();
    this.findAll();    
  }
  ngAfterViewInit(){
    //  $('#indi_name_id').select2();
  }

  onSubmit():void{
    if(!this.Form.valid) return this.alert.someting_wrong();     
    this.service.save(this.Form.value).then(result=>{
      this.alert.notify('บันทึกสำเร็จ');
      this.findAll();
    }).catch(err=>{
      console.log(err.error.erros);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    });
  }
  
  private findAll():void{
    this.service.findAll().then(result=>{
      this.ListkpiTpl = result;
    }).catch(err=>{
      console.log(err.error.erros);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    })
  }
  over():void{
    this.ItemKpiService.findAllDepCare().then(result=>{
      this.depCare = result;      
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    });
  }

  onUpdate(item:IKpiTpl){
    this.FormState = true;
    const form = this.Form;
    form.controls['id'].setValue(item.id);
    form.controls['indi_name_id'].setValue(item.indi_name_id);
    form.controls['label'].setValue(item.label)
  }
  onDelete(item:IKpiTpl){

  }

  loadIndicator():void{
    // ดึงข้อมูลชื่อตัวชี้วัด
    this.IndicatorService.onNameAll().then(result=>{       
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
    this.over();
    
  }

}
