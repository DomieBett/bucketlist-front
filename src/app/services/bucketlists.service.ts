import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http'
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

  addBucketlists(name: string) {

    let options = this.user.getToken()
    
    if (options){
      this.http.post('http://127.0.0.1:5000/api/v1/bucketlists/', {name: name}, options)
        .subscribe(res => {
          var bucketlists = res.json()

        })
    }
  }

  deleteBucketlists(id) {

    let options = this.user.getToken()

    if (options){
      return this.http.delete('http://127.0.0.1:5000/api/v1/bucketlists/'+id, options)
        .map(response => response);
    }
  }

  getBucketlists(){
    
    let options = this.user.getToken();

    if (options){
      return this.http.get('http://127.0.0.1:5000/api/v1/bucketlists', options)
        .map(response => response);
    }

    else{
      this.router.navigate(['/auth/login'])
    }
  }
}

