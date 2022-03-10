import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class HttpService{

    constructor(private http:HttpClient){}

    reqGet(url:string,body:any, token:string){
        return this.http.get(url, )
    }

    private appendHeader(token:string){
        const headers = {}; 
        if(token.length) headers['Authorization'] = `Bearer ${token}`
        return new HttpHeaders(headers)
    }
}