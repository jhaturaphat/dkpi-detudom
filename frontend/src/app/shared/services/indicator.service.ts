import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ICondition, IGroupkpi, INamekpi, ITypekpi } from 'src/app/kpi/components/indicator/indicator.interface';
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
    return lastValueFrom(this.http.post(this.url+'/group',model)) as Promise<IGroupkpi>;
  }
  onGroupUpdate(model:IGroupkpi, id:any){    
    return lastValueFrom(this.http.put(this.url+'/group/'+id, model)) as Promise<IGroupkpi>;
  }
  onGroupDelete(model:IGroupkpi){
    return lastValueFrom(this.http.delete(this.url+'/group/'+model.id))
  }

  onGroupSearch(term:any){
    return lastValueFrom(this.http.get(this.url+'/groupsearch',term))
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

  // ชื่อตัวชี้วัด  
  onNameFindItem(){
    return lastValueFrom(this.http.get(this.url+'/search-name')) as Promise<IGroupkpi>;
  }
  onNameAll(){    
    return lastValueFrom(this.http.get(this.url+'/name')) as Promise<IGroupkpi>;
  }
  onNameSave(model:INamekpi){    
    return lastValueFrom(this.http.post(this.url+'/name',model)) as Promise<IGroupkpi>;;
  }
  onNameUpdate(model:INamekpi, id:any){    
    return lastValueFrom(this.http.put(this.url+'/name/'+id, model)) as Promise<IGroupkpi>;
  }
  onNameDelete(model:INamekpi){
    return lastValueFrom(this.http.delete(this.url+'/name/'+model.id))
  }

  //ดึงข้อมูลจากตาราง kpi_condition
  findCondition(){
    return lastValueFrom(this.http.get(this.url+'/condition')) as Promise<ICondition[]>;
  }
  

}
