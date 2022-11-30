import { SignUpService } from './../@services/signup.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SignUpPost } from '../@models/signup.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  formGroup!: FormGroup;
  signUpValue: SignUpPost = {
    UserName: '',
    Password: '',
    CfmPassword: '',
    Email: ""
  }
  constructor(private router: Router, private SignUpService: SignUpService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      CfmPassword: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
    })
  }

  SignUpProcess(){
    if (this.formGroup.valid) {
      this.SignUpService.signUp(this.formGroup.value).subscribe(result=>{
        
        if(result.Status == 200){
          alert(result.Message); 
        }else{
          alert(result.Message);          
        }
      })
    }
  }
}
