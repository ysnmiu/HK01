import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './@services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: LoginService,private router: Router) { }
  title = 'HK01';

}
