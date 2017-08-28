import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    // Service to deal with authentication.

    // Variable to save error messages.
    message: string;

    constructor(private http: Http) { }

    login(email: string, password: string){

        //Log in function.
        return this.http.post(
            'http://127.0.0.1:5000/auth/login',
            {email: email, password: password}
        ).map((response: Response) => {

            // Get results from login attempt.
            let user = response.json();

            // Add auth token to local storage if login succesful.
            if (user && user.auth_token){
                localStorage.setItem('auth_token', user.auth_token);
                this.message = null;
            }
            // Get error message.
            else {
                this.message = user.message;
            }
            return user;
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
            let user = response.json();
            if (user && user.auth_token){

                // Save auth token to local storage.
                localStorage.setItem('auth_token', user.auth_token);
                this.message = null;
            }
            else{
                // Get error message.
                this.message = user.message;
            }
        });
    }

    logout(){
        // Log out by removing the auth token from storage.
        localStorage.removeItem('auth_token')
    }
}
