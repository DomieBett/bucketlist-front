import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router'

import { BucketList, Item } from './../models/bucketlist';


@Injectable()
export class UserService {

  response: boolean;

  constructor(
      private http: Http,
      private router: Router
   ){ }

    getToken(){
        let authToken = localStorage.getItem('auth_token');
        let headers = new Headers({ 'Accept': 'application/json' });
        if (authToken){
            headers.append('Authorization', authToken);
            return new RequestOptions({ headers: headers });
        }
        else{
            return false
        }
    }

    getName(){
      let user_name:string = localStorage.getItem('user_name');
      if (user_name)
        return user_name;
      else
        return "Guest";
    }
}
