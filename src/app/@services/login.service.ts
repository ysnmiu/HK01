import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPost } from '../@models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = '/api/login6_8';
  constructor(private http: HttpClient) { };

  JwtLogin(value: LoginPost){
    return this.http.post(this.url + '/jwtLogin', value);
  }
}
