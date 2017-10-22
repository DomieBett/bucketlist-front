import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { UserService } from './user.service';

@Injectable()
export class ApiService {

    message: string;
    baseUrl = 'https://bett-bucketlist.herokuapp.com';

    constructor(
      private http: Http,
      private router: Router,
      private user: UserService
    ) { }

    sendRequest(request: string, url: string, args, request_type = null) {
      const options = this.user.getToken();

      if (!options && !request_type) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      const completeUrl = this.baseUrl + url;

      if (request === 'delete') {
        return this.http.delete(completeUrl, options);
      }
      if (request === 'post') {
        return this.http.post(completeUrl, args, options);
      }
      if (request === 'put') {
        return this.http.put(completeUrl, args, options);
      }
      if (request === 'get') {
        return this.http.get(completeUrl, options);
      }
    }
}
