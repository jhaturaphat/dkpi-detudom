import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IndicatorService } from 'src/app/shared/services/indicator.service';

@Component({
  selector: 'app-groupkpi',
  templateUrl: './groupkpi.component.html',
  styleUrls: ['./groupkpi.component.css']
})
export class GroupkpiComponent  {

  form:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alert:AlertService,
    private indiService: IndicatorService
  ) { 
    this.form = this.formBuilder.group({
      id:['A', [Validators.required, Validators.maxLength(1)]],
      name_th:['หมวดตัวชี้วัด (ภาษาไทย)', [Validators.required]],
      name_en:['หมวดตัวชี้วัด (ภาษาอังกฤษ)', [Validators.required]]
    });    
  }

  onSubmit(): void{
    // if(this.form.invalid) return this.alert.someting_wrong();
    this.indiService.onSave(this.form.value);
  } 

}
