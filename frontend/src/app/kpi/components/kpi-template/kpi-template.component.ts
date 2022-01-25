import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IKpiTpl } from 'src/app/shared/interfaces/kpi.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';
import { ItemsKpiService } from 'src/app/shared/services/items-kpi.service';
import { KpiTemplateService } from 'src/app/shared/services/kpiTemplate.service';

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
      // id:['',[]],  
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
      frequency_id:['', [Validators.required]],
      status:['', [Validators.required]],
    });
   }

  private id:any;
  Form:FormGroup;
  nameKpi:any = "";
  frequency:any = '';
  depCare:any = '';
  ListkpiTpl:IKpiTpl[] = [];
  UpdateState:boolean = false;

  ngOnInit(): void {    
    this.findAll();    
  }
  

  onSubmit():void{       
    if(!this.Form.valid){
      console.log(this.Form);
      
      return this.alert.someting_wrong();  
    }  
    if(this.UpdateState){
      this.service.update(this.Form.value, this.id).then(result=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.findAll();   
      }).catch(err=>{
        console.log(err.error.errors);
        this.alert.someting_wrong(err.error.errors.sqlMessage);
      })
    }else{
      this.service.save(this.Form.value).then(result=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.findAll();      
      }).catch(err=>{
        console.log(err.error.errors);
        this.alert.someting_wrong(err.error.errors.sqlMessage);
      });
    } 
   
  }
  
  private findAll():void{
    this.UpdateState = false;
    this.resetForm();
    this.loadIndicator();    
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
    this.UpdateState = true;    
    const form = this.Form;  
    this.id = item.id;  
    // form.controls['id'].setValue(item.id);
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
    form.controls['howtooper'].setValue(item.howtooper);
    form.controls['ref'].setValue(item.ref);
    form.controls['active_date'].setValue(item.active_date);
    form.controls['edit_date'].setValue(item.edit_date);
    form.controls['edit_note'].setValue(item.edit_note);
    form.controls['note'].setValue(item.note);
    form.controls['dep_care_id'].setValue(item.dep_care_id);
    form.controls['frequency_id'].setValue(item.frequency_id);
    form.controls['status'].setValue(item.status);
  }

  onDelete(item:IKpiTpl){   
    this.alert.confirm().then(status=>{
      if(!status.isConfirmed) return;
          this.service.delete(item.id).then(()=>{   
          this.alert.notify('ลบรายการสำเร็จ');
          this.findAll();
      }).catch(err=>{
          console.log(err.error.errors);
          this.alert.someting_wrong(err.error.errors.sqlMessage);
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
    form.controls['howtooper'].setValue('');
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
    // ดึงข้อมูลชื่อตัวชี้วัด
    this.IndicatorService.onNameAll().then(result=>{       
      this.nameKpi = result
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    });
    // ดึงข้อมูลความถี่ในการจัดเก็บ
    this.ItemKpiService.onFindAllFreqStore().then(result=>{
      this.frequency = result;      
    }).catch(err=>{
      console.log(err.error.errors);
      this.alert.someting_wrong(err.error.errors.sqlMessage);
    });
    // ดึงข้อมูลผู้รับผิดชอบ
    this.over();
    
  }

}
