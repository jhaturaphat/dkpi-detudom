import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ItemsKpiService } from 'src/app/shared/services/items-kpi.service';
import { IDepcare } from './depcare.interface';

@Component({
  selector: 'app-depcare',
  templateUrl: './depcare.component.html',
  styleUrls: ['./depcare.component.css']
})
export class DepcareComponent implements OnInit {

  Form:FormGroup;
  UpdateState:boolean = false;
  items:any;

  constructor(
    private formBuilder: FormBuilder,
    private alert:AlertService,
    private service: ItemsKpiService
  ) {
    this.Form = this.formBuilder.group({      
      id:['',[]],
      name_th:['', [Validators.required]],
      name_en:['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAllDepCare().then(result=>{
      this.items = result;
    }).catch(err=>{
      this.alert.someting_wrong(err.error);
    })
  }
  onSubmit():void{
    if(!this.Form.valid) return this.alert.someting_wrong();  
    if(this.UpdateState){
      const id = this.Form.value['id'];
      this.service.onUpdateDepCare(id, this.Form.value).then(result=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.findAll();
        this.onReset();
      }).catch(err=>{
        console.log(err.error.errors);
        this.alert.someting_wrong(err.error);        
      });
    }else{
      this.service.onSaveDepCare(this.Form.value).then(result=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.findAll();
        this.onReset();
      }).catch(err=>{
        console.log(err.error.errors);
        this.alert.someting_wrong(err.error);        
      });
    }
  }

  onReset():void{
    this.UpdateState = false;
    const form = this.Form;
    form.controls['id'].setValue(''); 
    form.controls['name_th'].setValue(''); 
    form.controls['name_en'].setValue('');
  }

  onUpdate(item:any){    
    this.UpdateState = true; 
    const form = this.Form;    
    form.controls['id'].setValue(item.id);
    form.controls['name_th'].setValue(item.name_th); 
    form.controls['name_en'].setValue(item.name_en);   
  }
  onDelete(item:any){
    this.alert.confirm().then(status=>{
      if(!status.isConfirmed) return;
      this.service.onDeleteDepCare(item).then(()=> {
        this.findAll();
        this.alert.notify("ลบข้อมูลสำเร็จ");    
      }).catch(err=>{
        console.log(err.error.errors);
        this.alert.someting_wrong(err.error);
      })
    });
  }
}
