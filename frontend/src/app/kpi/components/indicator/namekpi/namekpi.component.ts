import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';

@Component({
  selector: 'app-namekpi',
  templateUrl: './namekpi.component.html',
  styleUrls: ['./namekpi.component.css']
})
export class NamekpiComponent implements OnInit {

  Form:FormGroup;
  indiTypeItems:any;
  NameAll:any;
  UpdateState:boolean = false;
  constructor(
    private formBuilder:FormBuilder,
    private service:IndicatorService,
    private alert:AlertService
  ) { 
    this.Form = this.formBuilder.group({
      id:['', [Validators.required]],
      name_th:['', [Validators.required]],
      name_en:['', []],
      indi_type_id:['', [Validators.required]]
    }); 
  }

  ngOnInit(): void {
    this.findAll();
    // ดึงข้อมูลประเภทตัวชี้วัด มาใส่ DowndownList
    this.service.onTypeAll().then(result=>{
      this.indiTypeItems = result;
      console.log(result);
                
    }).catch(err=>{
      this.alert.someting_wrong(err.error.errors.sqlMessage);
      console.log(err.error.errors);      
    })
  }

  findAll(){    
    this.service.onNameAll().then(result=> {
      this.NameAll = result;
      console.log(result);
      
    }).catch(err=>{
      this.alert.someting_wrong(err.error.errors.sqlMessage);
      console.log(err.error.errors);      
    })
  }

  onSubmit(){
    if(!this.Form.valid) return this.alert.someting_wrong();  
    if(this.UpdateState){
      // แก้ไขข้อมูล
      const id = this.Form.value['id'];
      this.service.onNameUpdate(this.Form.value, id).then((item)=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.findAll();  
        this.onReset();  
      }).catch((err)=>{
        console.log(err.error.errors); 
        this.alert.notify(err.error.errors.sqlMessage, 'danger');
      })

    }else{
      // บันทึกข้อมูล
      this.service.onNameSave(this.Form.value).then(result=>{
        this.alert.notify("บันทึกสำเร็จ");
        this.findAll();
        this.onReset();
      }).catch(err=>{
        this.alert.someting_wrong(err.error.errors.sqlMessage);
        console.log(err.error.errors); 
      });
    }
    
      
  }

  onReset():void{
    this.UpdateState = false;    
    const form = this.Form;
    form.controls['id'].setValue(''); 
    form.controls['name_th'].setValue(''); 
    form.controls['name_en'].setValue('') ;
    form.controls['indi_type_id'].setValue('') ;
  }
  onUpdate(item:any):void{
    
    this.UpdateState = true;
    const form = this.Form;
    form.controls['id'].setValue(item.id.toUpperCase()); 
    form.controls['name_th'].setValue(item.name_th); 
    form.controls['name_en'].setValue(item.name_en) ;
    form.controls['indi_type_id'].setValue(item.indi_type_id) ;
  }
  onDelete(item:any):void{
    this.alert.confirm().then(status=>{
      if(!status.isConfirmed) return;
      this.service.onNameDelete(item).then((item)=> {
        this.findAll();
        this.alert.notify("ลบข้อสำเร็จ");    
      }).catch(err=>{
        console.log(err.error.errors);
        this.alert.someting_wrong(err.error.errors.sqlMessage);
      })
    });
  }

}
