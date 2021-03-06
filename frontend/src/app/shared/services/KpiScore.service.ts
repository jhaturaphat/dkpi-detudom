import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { IDepCare, IKpiScore, IKpiScoreItem } from "../interfaces/kpi.interface";

@Injectable({
    providedIn:'root'
})

export class KpiScoreService{
    constructor(private http:HttpClient){ }   
    url = environment.apiUrl+'/kpi';

    findAll(year:any,  depcare_id?:any){   
        if(depcare_id){
            return lastValueFrom(this.http.get(this.url+'/score/'+year+'/'+depcare_id)) as Promise<IKpiScoreItem[]>
        }else{
            return lastValueFrom(this.http.get(this.url+'/score/'+year)) as Promise<IKpiScoreItem[]>
        }            
        
    }
    findOne(id:any, year:any){       
        return lastValueFrom(this.http.get(this.url+'/keep/score'+id+'/'+year)) as Promise<IKpiScoreItem[]>
    }
    save(body:IKpiScore) {
        return lastValueFrom(this.http.post(this.url+'/score', body)) as Promise<IKpiScore>
    }

    update(id:number, body:IKpiScore){
        return lastValueFrom(this.http.put(this.url+'/score/'+id, body)) as Promise<IKpiScore>
    }

}