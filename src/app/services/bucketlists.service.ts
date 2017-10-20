import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions }from '@angular/http';
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

        const url = '/bucketlists/';
        const args = { name: name };
        const response = this.api.sendRequest('post', url, args);

        if (response)
            return response.map(response => response);
        else
            return response;
    }

    updateBucketlist(id, name) {

        const url = '/bucketlists/' + id;
        const args = { name: name };
        const response = this.api.sendRequest('put', url, args);

        if (response)
            return response.map(response => response);
        else
            return response;
    }

    deleteBucketlists(id) {

        const url = '/bucketlists/' + id;
        const response = this.api.sendRequest('delete', url, null);

        if (response)
            return response.map(response => response);
        else
            return response;
    }

    getBucketlists(page){

        let url = '/bucketlists';
        if (page > 1) {
            url = url + '/?page=' + page;
        }
        const response = this.api.sendRequest('get', url, null);

        if (response)
            return response.map(response => response);
        else
            return response;
    }
}

