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
    url = environment.apiUrl+'/kpi';

    findAll(){
        return lastValueFrom(this.http.get(this.url+'/template')) as Promise<IKpiTpl[]>
    }
    findAllOne(id:any){
        return lastValueFrom(this.http.get(this.url+'/template/'+id)) as Promise<IKpiTpl[]>
    }
    save(body:IKpiTpl){
        return lastValueFrom(this.http.post(this.url+'/template',body)) as Promise<IKpiTpl>;
    }
    update(body:IKpiTpl, id:any){
        return lastValueFrom(this.http.put(this.url+'/template/'+id, body)) as Promise<IKpiTpl>;
    }
    delete(id:any){
        return lastValueFrom(this.http.delete(this.url+'/template/'+id)) as Promise<IKpiTpl>;
    }

    
}