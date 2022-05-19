import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { IKpiUnit } from "../interfaces/kpi.interface";

@Injectable({
    providedIn: 'root'
})
export class KpiUnitService {
    constructor(private http:HttpClient){ }   
    url = environment.apiUrl+'/kpi';

    findAll(){
        return lastValueFrom(this.http.get(this.url+'/unit')) as Promise<IKpiUnit[]> 
    }
}