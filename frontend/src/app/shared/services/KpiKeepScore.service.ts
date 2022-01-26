import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class KpiKeepService{
    constructor(
        private http: HttpClient
      ) {}
    
      url = environment.apiUrl+'/kpi';

      //ความถี่ในการจัดเก็บ  
  onFindAllFreqStore(){
    return lastValueFrom(this.http.get(this.url+'/keep')) as Promise<any>;
  }
}