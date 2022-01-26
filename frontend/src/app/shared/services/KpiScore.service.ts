import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { IKpiScore } from "../interfaces/kpi.interface";

@Injectable({
    providedIn:'root'
})

export class KpiScoreService{
    constructor(private http:HttpClient){ }   
    url = environment.apiUrl+'/kpi';

    findAll(year:any){  
        return lastValueFrom(this.http.get(this.url+'/score/'+year)) as Promise<IKpiScore[]>
    }
    findOne(id:any, year:any){       
        return lastValueFrom(this.http.get(this.url+'/score/'+id+'/'+year)) as Promise<IKpiScore[]>
    }
}