import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

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
