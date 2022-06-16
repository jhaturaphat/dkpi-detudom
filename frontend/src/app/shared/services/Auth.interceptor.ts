import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private loginService:LoginService,
        private router: Router
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.getToken();
        if(token){
            const cloned = req.clone({
                headers: req.headers.set("Authorization",`Bearer ${token}`)
            });            
                return next.handle(cloned).pipe(tap((event: HttpEvent<any>)=> {
                    if(event instanceof HttpErrorResponse){       
                        if((event.status !== 401)){                                                                           
                            return
                        }else{// ถ้า access_token หมดอายุให้ไปที่หน้า login
                            this.router.navigate(['login']);
                        }
                        
                    }     
                }
            ));   
                  
        }else{
            //  ถ้าในเครื่องไม่มี access_token ให้ไปที่หน้า login
            this.router.navigate(['login']);
            return next.handle(req)
        }
    }

    canCache(req: HttpRequest<any>):boolean {
        return req.urlWithParams.includes('')
    }

}

// https://stackoverflow.com/questions/61075812/angular-9-httpinterceptor-cannot-read-property-length-of-null