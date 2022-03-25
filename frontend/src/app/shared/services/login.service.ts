import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { ILogin } from "../interfaces/ILogin.interface";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(
        private http:HttpClient
    ){}
    private access_token = "access_token";
    private url = environment.apiUrl+'/authen/login';
    
    onLogin(model:ILogin){
        return lastValueFrom(this.http.post(this.url, model)) as Promise<ILogin>
    }

    setToken(token:string){
        localStorage.setItem(this.access_token, token)
    }

    getToken():string{
        return localStorage.getItem(this.access_token) as string;
    }

    clearToken():boolean{
        localStorage.removeItem(this.access_token);
        return true;
    }
}