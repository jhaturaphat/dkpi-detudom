import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroupkpi } from 'src/app/kpi/components/indicator/groupkpi/groupkpi.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(
    private http: HttpClient
  ) {}

   url = environment.apiUrl;

  onGetAll(){
    this.http.get(this.url).subscribe((item)=>{
      console.log(item);      
    });
  }
  onSave(model:IGroupkpi){    
    this.http.post(this.url+'/indi/group',model).subscribe((item)=>{
      console.log(item);  
    },
    (err)=>{
       console.log(err.error.errors);      
    })
  }
}
