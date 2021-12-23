import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IGroupkpi, ITypekpi } from 'src/app/kpi/components/indicator/groupkpi/groupkpi.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(
    private http: HttpClient
  ) {}

   url = environment.apiUrl+'/indi';

  //  หมวดตัวชี้วัด
  onGroupAll(){    
    return lastValueFrom(this.http.get(this.url+'/group')) as Promise<IGroupkpi>;
  }
  onGroupSave(model:IGroupkpi){    
    return lastValueFrom(this.http.post(this.url+'/group',model)) as Promise<IGroupkpi>;;
  }
  onGroupUpdate(model:IGroupkpi, id:any){    
    return lastValueFrom(this.http.put(this.url+'/group/'+id, model)) as Promise<IGroupkpi>;
  }
  onGroupDelete(model:IGroupkpi){
    return lastValueFrom(this.http.delete(this.url+'/group/'+model.id))
  }

  // ประเภทตัวชี้วัด  
  onTypeAll(){    
    return lastValueFrom(this.http.get(this.url+'/type')) as Promise<IGroupkpi>;
  }
  onTypeSave(model:ITypekpi){    
    return lastValueFrom(this.http.post(this.url+'/type',model)) as Promise<IGroupkpi>;;
  }
  onTypeUpdate(model:ITypekpi, id:any){    
    return lastValueFrom(this.http.put(this.url+'/type/'+id, model)) as Promise<IGroupkpi>;
  }
  onTypeDelete(model:ITypekpi){
    return lastValueFrom(this.http.delete(this.url+'/type/'+model.id))
  }
  

}