import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Bucketlist";
  loggedIn = false;
  customAnimation:any = {custom:true, state:"", enterDelay: 2000};

  constructor(
    private authService: AuthService,
    private router: Router,
    private user: UserService
  ){ }

  ngOnInit(){

  }
}
