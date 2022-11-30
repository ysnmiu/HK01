import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPost } from '../@models/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public backEndUrl = 'http://localhost:3000/login';
  constructor(private http: HttpClient) { };

  jwtLogin(formGroup:any):Observable<any>{
    
    return this.http.post<{token: string}>(this.backEndUrl, {formGroup})
    .pipe(
      map(result => {
        localStorage.setItem('jwt', result.token);
        return result;
      })
  );
}

logout() {
localStorage.removeItem('jwt');
}

public get loggedIn(): any {
  return (localStorage.getItem('jwt') == "dvcioljwefiosdfjweiofslkdgfjoiejfweiofjiojfsiodvjoiwefohisf");
  }
}