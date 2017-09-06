import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    // Service to deal with authentication.

    // Variable to save error messages.
    message: string;

    constructor(
        private http: Http,
        private router: Router
    ) { }

    login(email: string, password: string){

        //Log in function.
        return this.http.post(
            'http://127.0.0.1:5000/auth/login',
            {email: email, password: password}
        ).map((response: Response) => {

            // Get results from login attempt.
            let resp = response.json();

            // Add auth token to local storage if login succesful.
            if (resp && resp.auth_token){
                localStorage.setItem('auth_token', resp.auth_token);
                localStorage.setItem('user_name', resp.user);
                this.message = null;
            }
            // Get error message.
            else {
                this.message = resp.message;
            }
            return resp;
        });
    }

    register(name: string, email: string, password: string){
        //Register user function.

        //Send post request with user registration details.
        return this.http.post(
            'http://127.0.0.1:5000/auth/register',
            {name: name, email: email, password: password}
        ).map((response: Response) => {

            // Results from registration attempt.
            let resp = response.json();
            if (resp && resp.auth_token){

                // Save auth token to local storage.
                localStorage.setItem('auth_token', resp.auth_token);
                localStorage.setItem('user_name', resp.user);
                this.message = null;
            }
            else{
                // Get error message.
                this.message = resp.message;
            }
        });
    }

    logout(){
        // Log out by removing the auth token from storage.
        localStorage.removeItem('auth_token')
    }
}
