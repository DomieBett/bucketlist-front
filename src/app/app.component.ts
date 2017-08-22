import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Bucketlist";
  loggedIn = true;

  constructor(private authService: AuthService, private router: Router){

  }
  logout(){
    this.authService.logout()
    this.router.navigate(['/auth/login'])
    this.loggedIn = false;
  }
}
