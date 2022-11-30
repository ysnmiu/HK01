import { LoginService } from './../@services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPost } from '../@models/login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  
  loginValue: LoginPost = {
    UserName: '',
    Password: ''
  }
  constructor(private router: Router, private LoginService: LoginService) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    })
  }

  loginProcess(){

    if(this.formGroup.valid){
      
      this.LoginService.jwtLogin(this.formGroup.value).subscribe(result=>{
        
        
        if(result.Status == 200){
          
          localStorage.setItem('jwt',result.token);
          this.router.navigateByUrl('/create');
        }else{
          alert(result.Message);          
        }
      }
      )
     
      
    }
  }


}