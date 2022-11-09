import { LoginService } from './../@services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPost } from '../@models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginValue: LoginPost = {
    UserName: '',
    Password: ''
  }
  constructor(private router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
  }
  
  login() {
    console.log("try login");
    
    this.LoginService.JwtLogin(this.loginValue).subscribe((data: any) => {
      console.log("df");
      
      if (data.Status === 1) {
        localStorage.setItem('jwt', data.Data);
        this.router.navigateByUrl('/manage/home');
        console.log("logined");
        
      }else{
        alert(data.Message);
        console.log("login fail")
      
}
    });
  }

}