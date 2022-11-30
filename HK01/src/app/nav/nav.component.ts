import { Component, OnInit } from '@angular/core';
import{ ActivatedRoute} from '@angular/router';
import { LoginService } from './../@services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLogged: boolean | undefined;
  
  constructor(public auth: LoginService,private router: Router, private route:ActivatedRoute) { }

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
  }

}
