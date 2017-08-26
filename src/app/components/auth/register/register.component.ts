import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  message: string = this.authService.message;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model.name, this.model.email, this.model.password)
      .subscribe(
        data =>{
          this.router.navigate(['/auth/login']);
        }
      )
  }

}
