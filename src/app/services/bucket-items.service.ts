import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

import { BucketList } from './../models/bucketlist';
import { UserService } from './user.service';
import { ApiService } from './api.service';


@Injectable()
export class BucketItemsService {

    constructor(
        private user: UserService,
        private http: Http,
        private router: Router,
        private api: ApiService
    ) { }

    getSingleBucket(id: number){

        let url = "/api/v1/bucketlists/" + id;
        let response = this.api.sendRequest("get", url, null);

        console.log(response);
        if (response)
            return response.map(response => response);
        else
            return response;
    }

    addItem(bucket_id, name: string){

        let url = "/api/v1/bucketlists/" + bucket_id + "/items/"
        let response = this.api.sendRequest("post", url, {name: name});

        if (response)
            return response.map(response => response);
        else
            return response
    }

    updateItem(bucket_id, item_id, name, done){

        let url = "/api/v1/bucketlists/"
            + bucket_id + "/items/" + item_id;
        let response = this.api.sendRequest(
            "put", url, { name: name, done: done }
        );

        if (response)
            return response.map(response => response);
        else
            return response
    }

    deleteItem(bucket_id, item_id){

        let url = "/api/v1/bucketlists/"
            + bucket_id + "/items/" + item_id;
        let response = this.api.sendRequest("delete", url, null);

        if (response)
            return response.map(response => response.json());
        else
            return response
    }
}
