import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

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

  /**
   * Gets single bucketlist from api.
   *
   * @param {number} id
   * @returns {any}
   */
    getSingleBucket(id: number){

        const url = '/bucketlists/' + id;
        const response = this.api.sendRequest('get', url, null);

        if (response)
            return response.map(response => response);
        else
            return response;
    }

    addItem(bucket_id, name: string){

        const url = '/bucketlists/' + bucket_id + '/items/';
        const response = this.api.sendRequest('post', url, {name: name});

        if (response)
            return response.map(response => response);
        else
            return response;
    }

    updateItem(bucket_id, item_id, name, done){

        const url = '/bucketlists/'
            + bucket_id + '/items/' + item_id;
        const response = this.api.sendRequest(
            'put', url, { name: name, done: done }
        );

        if (response)
            return response.map(response => response);
        else
            return response;
    }

    deleteItem(bucket_id, item_id) {

        const url = '/bucketlists/'
            + bucket_id + '/items/' + item_id;
        const response = this.api.sendRequest('delete', url, null);

        if (response)
            return response.map(response => response);
        else
            return response;
    }
}
