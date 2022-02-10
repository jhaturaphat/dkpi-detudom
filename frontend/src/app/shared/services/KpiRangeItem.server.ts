import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { IkpiRangeItem } from "../interfaces/kpi.interface";

@Injectable({
    providedIn:'root'
})

export class KpiRangeItem {
    constructor(
        private http: HttpClient
      ) {}
    
      url = environment.apiUrl+'/kpi';

      //ความถี่ในการจัดเก็บ  
  findAll(frequency_id:any){
    return lastValueFrom(this.http.get(this.url+'/range/'+frequency_id)) as Promise<IkpiRangeItem[]>;
  }
}