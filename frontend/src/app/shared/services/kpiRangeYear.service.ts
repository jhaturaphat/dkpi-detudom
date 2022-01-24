import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { IKpiRangeYear } from "../interfaces/kpi.interface";

@Injectable({
    providedIn:'root'
})

// ปีงบประมาณ
export class KpiRangeYearService{
    constructor(private http:HttpClient){ }   
    url = environment.apiUrl+'/kpi';

    findAll(){
        return lastValueFrom(this.http.get(this.url+'/year/')) as Promise<IKpiRangeYear[]>
    }
    findAllOne(id:any, year:any){
        return lastValueFrom(this.http.get(this.url+'/year/'+id)) as Promise<IKpiRangeYear[]>
    }
    save(body:IKpiRangeYear){
        return lastValueFrom(this.http.post(this.url+'/year',body)) as Promise<IKpiRangeYear>;
    }
    update(body:IKpiRangeYear, id:any){
        return lastValueFrom(this.http.put(this.url+'/year/'+id, body)) as Promise<IKpiRangeYear>;
    }
    delete(id:any){
        return lastValueFrom(this.http.delete(this.url+'/year/'+id)) as Promise<IKpiRangeYear>;
    }
}