import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { IDepcare } from "src/app/kpi/components/depcare/depcare.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class KpiDepCareService {
    constructor(private http:HttpClient){ }   
    url = environment.apiUrl+'/itemkpi';

    findAll(){
        return lastValueFrom(this.http.get(this.url+'/depcare')) as Promise<IDepcare[]>;
    }
}
