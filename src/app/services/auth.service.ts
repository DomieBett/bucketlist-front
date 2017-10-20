import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import {ApiService} from './api.service';

@Injectable()
export class AuthService {
    // Service to deal with authentication.

    // Variable to save error messages.
    message: string;

    constructor(
        private http: Http,
        private router: Router,
        private api: ApiService
    ) { }

    setLoginCredentials(response) {
      {
        // Results from registration attempt.
        const resp = response.json();
        if (resp && resp.auth_token) {

          // Save auth token to local storage.
          localStorage.setItem('auth_token', resp.auth_token);
          localStorage.setItem('user_name', resp.user);
          this.message = null;
        } else {
          // Get error message.
          this.message = resp.message;
        }

        return resp;
      }
    }

    login(email: string, password: string) {

      const url = '/auth/login/';
      const args = {email: email, password: password};
      const response = this.api.sendRequest('post', url, args, 'auth');

      if (response) {
        console.log('Logging in');
        return response.map(resp => this.setLoginCredentials(resp));
      } else {
        console.log('Naah');
        return null;
      }
    }

    register(name: string, email: string, password: string){
      const url = '/auth/register/';
      const args = {name: name, email: email, password: password};
      const response = this.api.sendRequest('post', url, args, 'auth');

      if (response) {
        return response.map(resp => this.setLoginCredentials(resp));
      } else {
        return null;
      }
    }

    logout() {
        // Log out by removing the auth token and user from storage.
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_name');
    }
}
