import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  message: string;

  constructor(private http: Http) { }

  login(email: string, password: string){
    return this.http.post('http://127.0.0.1:5000/auth/login', {email: email, password: password})
      .map((response: Response) => {
        let user = response.json();
        console.log(user)
        if (user && user.auth_token){
          localStorage.setItem('auth_token', user.auth_token);
          this.message = null;
        }
        else {
          this.message = user.message;
        }

        return user;
      });
  }

  register(name: string, email: string, password: string){
    return this.http.post('http://127.0.0.1:5000/auth/register', {name: name, email: email, password: password})
      .map((response: Response) => {
        let user = response.json();
        if (user && user.auth_token){
          localStorage.setItem('auth_token', user.auth_token);
          this.message = null;
        }
        else{
          this.message = user.message;
        }
      })
  }

  logout(){
    localStorage.removeItem('auth_token')
  }
}
