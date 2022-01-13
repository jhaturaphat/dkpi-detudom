import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';

@Component({
  selector: 'app-typekpi',
  templateUrl: './typekpi.component.html',
  styleUrls: ['./typekpi.component.css']
})
export class TypekpiComponent implements OnInit {

  Form:FormGroup;
  indiType:any = null;
  UpdateState:boolean = false;

  constructor(
    private service:IndicatorService,
    private alert:AlertService,
    private formBuilder: FormBuilder,
  ) { 
    this.Form = this.formBuilder.group({
      id:['', [Validators.required, Validators.maxLength(1)]],
      name_th:['', [Validators.required]],
      name_en:['', [Validators.required]],
      indi_group_id:['',[Validators.required]]
    });
  }

  public groupItmes:any;

  ngOnInit(): void {
    this.indiAll();
    this.service.onGroupAll().then((result)=>{
        this.groupItmes = result;            
    }).catch(err=>{
      this.alert.someting_wrong(); 
      console.log(err.error);
    })
  }  

  private indiAll(){
    this.service.onTypeAll().then((items)=> {
      this.indiType = items;      
    })
  }

  onSubmit():void{    
    if(!this.Form.valid) return this.alert.someting_wrong();  
    if(this.UpdateState){
      const id = this.Form.value['id'];
      this.service.onTypeUpdate(this.Form.value, id).then((item)=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.indiAll();  
        this.onReset();  
      }).catch((err)=>{
        console.log(err.error.errors); 
        this.alert.notify(err.error.errors.sqlMessage, 'danger');
      });      
    }else{
      this.service.onTypeSave(this.Form.value).then((item)=>{
        this.alert.notify('บันทึกสำเร็จ'); 
        this.indiAll();  
        this.onReset();    
      }).catch((err)=>{
        console.log(err.error.errors); 
        this.alert.notify(err.error.errors.sqlMessage, 'danger');
      })
    }
    
  }
  public onReset():void{
    this.UpdateState = false;    
    const form = this.Form;
    form.controls['id'].setValue(''); 
    form.controls['name_th'].setValue(''); 
    form.controls['name_en'].setValue('') ;
    form.controls['indi_group_id'].setValue('') ;
  }
  onUpdate(item:any):void{
       
    this.UpdateState = true;
    const form = this.Form;
    form.controls['id'].setValue(item.id.toUpperCase()); 
    form.controls['name_th'].setValue(item.name_th); 
    form.controls['name_en'].setValue(item.name_en) ;
    form.controls['indi_group_id'].setValue(item.indi_group_id) ;
  }
  onDelete(item:any):void{
    this.alert.confirm().then(status=>{
      if(!status.isConfirmed) return;
      this.service.onTypeDelete(item).then((item)=> {
        this.indiAll();
        this.alert.notify("สำเร็จ");    
      }).catch(err=>{
        console.log(err.error.errors);
        this.alert.someting_wrong(err.error.errors.sqlMessage);
      })
    });
  }

}
