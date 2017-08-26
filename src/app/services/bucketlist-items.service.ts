import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

import { BucketList } from './../models/bucketlist';
import { GlobalService } from './global.services';


@Injectable()
export class BucketlistItemsService {

  constructor(
    private globalService: GlobalService,
    private http: Http,
    private router: Router
  ) { }

  getSingleBucket(id: number){
    let options = this.globalService.getToken();
    if (options){
      return this.http.get('http://127.0.0.1:5000/api/v1/bucketlists/'+id, options)
        .map(response => response.json()); 
    }
    else{
      this.router.navigate(['/auth/login'])
    }
  }

  deleteItem(bucket_id, item_id){
    let options = this.globalService.getToken();
    if (options) {
      return this.http.delete('http://127.0.0.1:5000/api/v1/bucketlists/'+bucket_id+"/items/"+item_id, options)
        .map(response => response.json());
    }
    else{
      this.router.navigate(['/auth/login/'])
    }
  }
}
