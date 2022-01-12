import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { IKpiTpl } from "../interfaces/kpi.interface";

@Injectable({
    providedIn: 'root'
  })
export class KpiTemplateService{
    constructor(private http:HttpClient){ }   
    url = environment.apiUrl+'/kpitemplate';

    findAll(){
        return lastValueFrom(this.http.get(this.url+'/find')) as Promise<IKpiTpl[]>
    }
    findAllOne(id:any){
        return lastValueFrom(this.http.get(this.url+'/find/'+id)) as Promise<IKpiTpl[]>
    }
    save(body:IKpiTpl){
        return lastValueFrom(this.http.post(this.url+'/save',body)) as Promise<IKpiTpl>;
    }
}