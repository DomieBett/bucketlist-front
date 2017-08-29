import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions }from '@angular/http'
import { Router } from '@angular/router';

import { BucketList } from './../models/bucketlist';
import { UserService } from './user.service';
import { BucketToolsService } from './bucket-tools.service'


@Injectable()
export class BucketlistsService {

    bktlists: BucketList[] = [];

    constructor(
        private http: Http,
        private router: Router,
        private user: UserService,
        private bucketTools: BucketToolsService
    ) { }

    addBucketlist(name: string) {

        //Get auth token.
        let options = this.user.getToken()
        if (options){
            //Send post request to add bucketlist.
            return this.http.post(
                'http://127.0.0.1:5000/api/v1/bucketlists/',
                {name: name}, options
            ).map(response => response);
        }
    }

    updateBucketlist(id, name) {

        let options = this.user.getToken();
        if (options) {

            return this.http.put(
                'http://127.0.0.1:5000/api/v1/bucketlists/'
                + id, {name: name}, options
            ).map(response => response);
        }
    }

    deleteBucketlists(id) {

        //Get auth token
        let options = this.user.getToken();
        if (options){
            //Send delete request to delete bucketlist.
            return this.http.delete(
                'http://127.0.0.1:5000/api/v1/bucketlists/'
                + id, options
            ).map(response => response);
        }
    }

    getBucketlists(page){

        //Get auth token.
        let options = this.user.getToken();

        let url = 'http://127.0.0.1:5000/api/v1/bucketlists'
        if (options){

            if (page > 1){
                url = 'http://127.0.0.1:5000/api/v1/bucketlists/?page=' + page;
            }

            //Send get request to retrieve all bucketlists.
            return this.http.get(
                url,
                options
            ).map(response => response);
        }
        else{
            //Redirect to login page if not logged in.
            this.router.navigate(['/auth/login']);
        }
    }
}

