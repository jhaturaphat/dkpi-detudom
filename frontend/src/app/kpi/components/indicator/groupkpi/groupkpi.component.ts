import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';
import { IGroupkpi } from '../indicator.interface';

@Component({
  selector: 'app-groupkpi',
  templateUrl: './groupkpi.component.html',
  styleUrls: ['./groupkpi.component.css']
})
export class GroupkpiComponent implements OnInit {

  Form:FormGroup;
  indiGroup:any;
  UpdateState:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private alert:AlertService,
    private indiService: IndicatorService
  ) { 
    this.Form = this.formBuilder.group({
      id:['', [Validators.required, Validators.maxLength(1)]],
      name_th:['', [Validators.required]],
      name_en:['', [Validators.required]]
    });    
  }
  ngOnInit(): void {
     this.indiAll();
  }
  public onReset():void{
    this.UpdateState = false;    
    const form = this.Form;
    form.controls['id'].setValue(''); 
    form.controls['name_th'].setValue(''); 
    form.controls['name_en'].setValue('') ;
  }

  onSubmit(): void{  
    if(!this.Form.valid) return this.alert.someting_wrong();  
    if(this.UpdateState){ 
      const id = this.Form.value['id'];
      this.indiService.onGroupUpdate(this.Form.value, id).then((item)=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.indiAll();  
        this.onReset();  
      }).catch((err)=>{
        console.log(err); 
        this.alert.notify(err.error, 'danger');
      })
    }else{
      this.indiService.onGroupSave(this.Form.value).then((item)=>{
        this.alert.notify('บันทึกสำเร็จ');
        this.indiAll();  
        this.onReset();     
      }).catch((err)=>{
        console.log(err); 
        this.alert.notify(err.error, 'danger');
      })
    }
    
  } 

  private indiAll(){
    this.indiService.onGroupAll().then((items)=> {
      this.indiGroup = items;      
    }).catch(err=>{
      console.log(err);
      
    })
  }

  public onUpdate(item:IGroupkpi){
    this.UpdateState = true; 
    const form = this.Form;
    form.controls['id'].setValue(item.id.toUpperCase()); 
    form.controls['name_th'].setValue(item.name_th); 
    form.controls['name_en'].setValue(item.name_en) ;
  }

  public async onDelete(item:IGroupkpi){
    this.alert.confirm().then(status=>{
      if(!status.isConfirmed) return;
      this.indiService.onGroupDelete(item).then((item)=> {
        this.indiAll();
        this.alert.notify("สำเร็จ");    
      }).catch(err=>{
        console.log(err);
        this.alert.someting_wrong(err.error);
      })
    });
    
    
    
  }

}
