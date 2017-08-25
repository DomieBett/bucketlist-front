import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';

import { BucketList, Items } from './../../models/bucketlist';
import { GlobalService } from './global.services';


@Injectable()
export class BucketlistsService {

  bktlists: BucketList[] = [];
  constructor(
    private http: Http,
    private router: Router,
    private globalService: GlobalService
  ) { }

  addBucketlists(name: string) {

    let options = this.globalService.getToken()
    
    if (options){
      this.http.post('http://127.0.0.1:5000/api/v1/bucketlists/', {name: name}, options)
        .subscribe(res => {
          var bucketlists = res.json()

          if (this.globalService.unauthorised(bucketlists)){
            return this.router.navigate(['/auth/login'])
          }
        })
    }
  }

  deleteBucketlists(id) {
    console.log("We have got here");
    let options = this.globalService.getToken()

    if (options){
      return this.http.delete('http://127.0.0.1:5000/api/v1/bucketlists/'+id, options)
        .map(response => response.json());
    }
  }

  getBucketlists(): BucketList[]{
    
    let options = this.globalService.getToken();
    var bktlists:BucketList[] = []

    if (options){
      this.http.get('http://127.0.0.1:5000/api/v1/bucketlists', options)
        .subscribe(res => {
          var bucketlists = res.json()

          if (this.globalService.unauthorised(bucketlists)){
            return this.router.navigate(['/auth/login'])
          }
          
          if (bucketlists){
            for (var i = 0; i < bucketlists.length; i++) {
              var bucketlist = this.globalService.parseBucketlists(bucketlists[i])
              bktlists.push(bucketlist)
              console.log(bucketlist)
            }
          }
      });
      return bktlists
    }

    else{
      this.router.navigate(['/auth/login'])
    }
  }
}

