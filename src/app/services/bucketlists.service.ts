import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions }from '@angular/http'
import { Router } from '@angular/router';

import { BucketList } from './../models/bucketlist';
import { UserService } from './user.service';
import { BucketToolsService } from './bucket-tools.service';
import { ApiService } from './api.service';


@Injectable()
export class BucketlistsService {

    bktlists: BucketList[] = [];

    constructor(
        private http: Http,
        private router: Router,
        private user: UserService,
        private bucketTools: BucketToolsService,
        private api: ApiService
    ) { }

    addBucketlist(name: string) {

        let url = "/api/v1/bucketlists/";
        let args = { name: name };
        let response = this.api.sendRequest("post", url, args);

        if (response)
            return response.map(response => response);
        else
            return response
    }

    updateBucketlist(id, name) {

        let url = "/api/v1/bucketlists/";
        let args = { name: name };
        let response = this.api.sendRequest("put", url, args);

        if (response)
            return response.map(response => response)
        else
            return response
    }

    deleteBucketlists(id) {

        let url = "/api/v1/bucketlists/" + id;
        let response = this.api.sendRequest("delete", url, null);

        if (response)
            return response.map(response => response)
        else
            return response
    }

    getBucketlists(page){

        let url = "/api/v1/bucketlists"
        if (page > 1) {
            url = url + "/?page=" + page;
        }
        let response = this.api.sendRequest("get", url, null);

        if (response)
            return response.map(response => response)
        else
            return response
    }
}

