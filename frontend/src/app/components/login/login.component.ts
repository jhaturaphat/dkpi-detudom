import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { AppUrl } from 'src/app/url';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private alert:AlertService,
    private router:Router,
    private loginService:LoginService
  ) {
    this.initalCreateFormData()
   }

  Form!:FormGroup;

  ngOnInit(): void {
    
  }
  onSubmit(){      
      this.loginService.onLogin(this.Form.value).then(result=>{
        console.log(result);  
        this.alert.notify("เข้าสู่ระบบสำเร็จ")  
        this.loginService.setToken(result.token as string)    
        this.router.navigate(['/',AppUrl.Dashboard])
      }).catch(err=>{
        console.log(err);
        this.alert.someting_wrong("ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง")        
      })
  }

  private initalCreateFormData(){
    this.Form = this.formBuilder.group({
      username:['somkid', Validators.required],
      password:['_somkid_', Validators.required],
      remember:[false]
    })
  }

}
