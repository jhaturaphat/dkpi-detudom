import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IDepcare } from 'src/app/kpi/components/depcare/depcare.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsKpiService {

  constructor(private http: HttpClient) { }
  url = environment.apiUrl+'/itemkpi';

  //  หมวดตัวชี้วัด
  findAllDepCare(){    
    return lastValueFrom(this.http.get(this.url+'/depcare')) as Promise<IDepcare>;
  }
  onSaveDepCare(model:IDepcare){
    return lastValueFrom(this.http.post(this.url+'/depcare',model)) as Promise<IDepcare>;
  }
  onUpdateDepCare(id:any, model:IDepcare){
    return lastValueFrom(this.http.put(this.url+'/depcare/'+id, model)) as Promise<IDepcare>;
  }
  onDeleteDepCare(model:any){
    return lastValueFrom(this.http.delete(this.url+'/depcare/'+model.id))
  }

}
