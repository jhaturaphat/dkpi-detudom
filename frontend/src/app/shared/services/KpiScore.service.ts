import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class KpiScoreService{
    constructor(private http:HttpClient){ }   
    url = environment.apiUrl+'/kpi';

    findAll(year:any){
        return lastValueFrom(this.http.get(this.url+'/score'))
    }
}