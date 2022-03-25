import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUrl } from 'src/app/url';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router:Router
    ) { }

  AppUrl = AppUrl;

  ngOnInit(): void {
  }

  onLogOut():void{
    if(this.loginService.clearToken()){
      this.router.navigate(['/',AppUrl.Dashboard])
    }
  }

}
