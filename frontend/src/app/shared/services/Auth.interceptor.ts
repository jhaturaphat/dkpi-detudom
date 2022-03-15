import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private loginService:LoginService,
        private router: Router
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.getToken();
        if(token.length > 0){
            const cloned = req.clone({
                headers: req.headers.set("Authorization",`Bearer ${token}`)
            });
            return next.handle(cloned).pipe(tap(()=> {},
            (err:any)=>{                
                if(err instanceof HttpErrorResponse){
                    
                    
                    if(err.status !== 401){
                        return
                    }
                    this.router.navigate(['login']);
                }
            }
            ))
        }
        else{
            return next.handle(req)
        }
    }

}