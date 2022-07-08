import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IKpiTpl } from 'src/app/shared/interfaces/kpi.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';
import { ItemsKpiService } from 'src/app/shared/services/items-kpi.service';
import { KpiTemplateService } from 'src/app/shared/services/kpiTemplate.service';
import { ICondition } from '../indicator/indicator.interface';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thLocale } from 'ngx-bootstrap/locale';
import { IDepcare } from '../depcare/depcare.interface';
import { KpiDepCareService } from 'src/app/shared/services/KpiDepCare.service';
defineLocale('th', thLocale);

declare const $:any;

@Component({
  selector: 'app-kpi-template',
  templateUrl: './kpi-template.component.html',
  styleUrls: ['./kpi-template.component.css']
})


export class KpiTemplateComponent implements OnInit {

  depCareDopdown:any = {
    id:'',
    text:'หน่วยงานผู้รับผิดชอบ'
  }
  depCareList:IDepcare[] = [];
  private id:any;
  Form:FormGroup;
  nameKpi:any = "";
  frequency:any = '';
  depCare:any = '';
  condition:ICondition[] = [];
  ListkpiTpl:IKpiTpl[] = [];
  UpdateState:boolean = false; //ถ้ามีการคลิกแก้ไขฟอร์ม
  // Pagination
  pg:any = {
    disabled : false,
    totalItems : 11,
    page : 0,
    itemsPerPage : 5,
    depFind: 0
  } 


  constructor(    
    private localeService: BsLocaleService,
    private IndicatorService:IndicatorService,
    private ItemKpiService:ItemsKpiService,
    private service:KpiTemplateService,
    private depCareService: KpiDepCareService,
    private alert:AlertService,
    private formBuilder: FormBuilder,    
  ) {
    this.localeService.use("th");
    this.Form = this.formBuilder.group({    
      // id:['',[]],  
      indi_name_id:[{value: '', disabled: false},[Validators.required]],  
      label:['',[Validators.required]],
      objective:['', [Validators.required]],
      formular:['', [Validators.required]],
      txt_a:['', [Validators.required]],
      txt_b:['', [Validators.required]],
      diag_a:['', []],
      diag_b:['', []],
      measure:['', [Validators.required]],
      benchmark:['', []],
      kpi_condition_id:['', []],
      ref:['', [Validators.required]],
      active_date:['', [Validators.required]],
      edit_date:['', []],
      edit_note:['', []],
      note:['', []],
      dep_care_id:['', [Validators.required]],
      frequency_id:['', [Validators.required]],
      status:['', [Validators.required]],
    });

   }

  ngOnInit(): void {    
    this.findAll();    
    this.findDepCare();
  }
  

  onSubmit():void{       
    // console.log(this.Form.value);
    if(!this.Form.valid){       
      return this.alert.someting_wrong();  
    }  
    if(this.UpdateState){
      this.service.update(this.Form.value, this.id).then(result=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.findAll();   
      }).catch(err=>{
        console.log(err.error);
        this.alert.someting_wrong(err.errors);
      })
    }else{
      this.service.save(this.Form.value).then(result=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.findAll();      
      }).catch(err=>{
        console.log(err.error);
        this.alert.someting_wrong(err.error);
      });
    } 
   
  }

  pageChanged(event:any){    
    this.pg.page = (event.page - 1) * this.pg.itemsPerPage;   
    this.findAll();
  }
  
  private findAll():void{
    this.UpdateState = false;
    this.resetForm()
    this.service.findAll(this.pg.page, this.pg.itemsPerPage, this.pg.depFind).then(result=>{
      console.log('ListkpiTpl รายการข้อมูเทมเพลต', result.result);      
      this.ListkpiTpl = result.result;    
      this.pagiConf(result.pagiConf);
    }).catch(err=>{
      console.log(err.error.erros);
      this.alert.someting_wrong(err.error);
    });

    this.loadIndicator();
  }

  kpiCondition(){
    this.IndicatorService.findCondition().then(result=>{
      this.condition = result;
    }).catch(err=>{
      console.log(err.error);
      
    })
  }
  over():void{
    this.ItemKpiService.findAllDepCare().then(result=>{
      this.depCare = result;      
    }).catch(err=>{
      console.log(err.error);
      this.alert.someting_wrong(err.error);
    });
  }
  pagiConf(item:any){
    this.pg.totalItems = item.totalItem;
    this.pg.page = item.page;
    this.pg.itemsPerPage = item.itemPerPage;
  }

  onUpdate(item:IKpiTpl){
    this.UpdateState = true;    
    const form = this.Form;  
    console.log(form);
    
    // this.id = item.id;      
    form.controls['indi_name_id'].setValue(item.indi_name_id);    
    form.controls['label'].setValue(item.label);
    form.controls['objective'].setValue(item.objective);
    form.controls['formular'].setValue(item.formular);
    form.controls['txt_a'].setValue(item.txt_a);
    form.controls['txt_b'].setValue(item.txt_b);
    form.controls['diag_a'].setValue(item.diag_a);
    form.controls['diag_b'].setValue(item.diag_b);
    form.controls['measure'].setValue(item.measure);
    form.controls['benchmark'].setValue(item.benchmark);
    form.controls['kpi_condition_id'].setValue(item.kpi_condition_id);
    form.controls['ref'].setValue(item.ref);
    form.controls['active_date'].setValue(item.active_date);
    form.controls['edit_date'].setValue(item.edit_date);
    form.controls['edit_note'].setValue(item.edit_note);
    form.controls['note'].setValue(item.note);
    form.controls['dep_care_id'].setValue(item.dep_care_id);
    form.controls['frequency_id'].setValue(item.frequency_id);
    form.controls['status'].setValue(item.status);

    console.log(this.Form.value);
    
  }

  onDelete(item:IKpiTpl){   
    this.alert.confirm().then(status=>{
      if(!status.isConfirmed) return;
          this.service.delete(item.id).then(()=>{   
          this.alert.notify('ลบรายการสำเร็จ');
          this.findAll();
      }).catch(err=>{
          console.log(err.error);
          this.alert.someting_wrong(err.error);
        });
      })   
  }

  resetForm(){        
    const form = this.Form; 
    // form.controls['id'].setValue('');    
    form.controls['indi_name_id'].setValue('');
    form.controls['label'].setValue('');
    form.controls['objective'].setValue('');
    form.controls['formular'].setValue('');
    form.controls['txt_a'].setValue('');
    form.controls['txt_b'].setValue('');
    form.controls['diag_a'].setValue('');
    form.controls['diag_b'].setValue('');
    form.controls['measure'].setValue('');
    form.controls['benchmark'].setValue('');
    form.controls['kpi_condition_id'].setValue('');
    form.controls['ref'].setValue('');
    form.controls['active_date'].setValue('');
    form.controls['edit_date'].setValue('');
    form.controls['edit_note'].setValue('');
    form.controls['note'].setValue('');
    form.controls['dep_care_id'].setValue('');
    form.controls['frequency_id'].setValue('');
    form.controls['status'].setValue('');
  }

  loadIndicator():void{
    // ดึงข้อมูลชื่อตัวชี้วัดเลือกเอาตัวที่ยังไม้ได้เพิ่มในรายการ
    this.IndicatorService.onNameAll().then(result=>{         
      let item = this.ListkpiTpl.map((e:any)=> e.idn_id);
      this.nameKpi = result.filter((e:any)=>!item.includes(e.id));

    }).catch(err=>{
      console.log(err.error);
      this.alert.someting_wrong(err.error);
    });
    // ดึงข้อมูลความถี่ในการจัดเก็บ
    this.ItemKpiService.onFindAllFreqStore().then(result=>{
      this.frequency = result;      
    }).catch(err=>{
      console.log(err.error);
      this.alert.someting_wrong(err.error);
    });
    // ดึงข้อมูลผู้รับผิดชอบ
    this.over();
    
    // ดึงข้อมูลตาราง kpi_condition
    this.kpiCondition();
  }

  // Section รายการข้อมูเทมเพลต

  searchKpiScoe(item:any){
    this.depCareDopdown.id = item.id
    this.depCareDopdown.text = item.name_th  
    this.pg.depFind = this.depCareDopdown.id;
    
    this.service.findFilter(this.depCareDopdown.id).then(res=>this.ListkpiTpl = res).catch(err=>{
      console.log(err);  
      this.alert.someting_wrong("โปรแกรมดึงข้อมูลตาราง kpi_tpl ไม่ได้")   
    })
  }

  findDepCare():void{
    this.depCareService.findAll().then(result => this.depCareList = result).catch(err=>{
      console.log(err);  
      this.alert.someting_wrong("โปรแกรมดึงข้อมูลตาราง dep_care ไม่ได้")    
    })
  }

}
