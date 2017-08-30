import { Injectable } from '@angular/core';
import { Http, Response }from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { UserService } from './user.service';

@Injectable()
export class ApiService {
    
    message: string;
    baseUrl: string = "http://127.0.0.1:5000/"

    constructor(
    	private http: Http,
    	private router: Router,
    	private user: UserService
    ) { }

    sendRequest(request:string, url:string, args) {

    	let options = this.user.getToken();
    	let completeUrl = this.baseUrl + url;

    	if (request == "delete")
    		return this.http.delete(completeUrl, options)
    	if (request == "post")
    		return this.http.post(completeUrl, args, options)
    	if (request == "put")
    		return this.http.put(completeUrl, args, options)
    	if (request == "get")
    		return this.http.get(completeUrl, options)
    }
}