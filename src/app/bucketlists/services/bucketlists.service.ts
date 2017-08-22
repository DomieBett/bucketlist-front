import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Router } from '@angular/router';

import { BucketList, Items } from './../../models/bucketlist';


@Injectable()
export class BucketlistsService {

  bktlists: BucketList[] = [];
  constructor(private http: Http, private router: Router) { }

  parseItems(bucketlist): Items[]{

    var items = []

    for (var i = 0; i < bucketlist.items.length; i++) {
      var item = bucketlist.items[i];
      var item_data = {
        id: item.id,
        name: item.name,
        date_created: item.date_created,
        date_modified: item.date_modified,
        done: item.done
      }
      items.push(item_data)
    }
    return items
  }

  parseBucketlists(bucketlists, pos): BucketList{

    var bucketlist = bucketlists[pos]

    var bktlist = {
      id: bucketlist.id,
      name: bucketlist.name,
      date_created: bucketlist.date_created,
      date_modified: bucketlist.date_modified,
      items: this.parseItems(bucketlist),
      created_by: bucketlist.created_by
    }
    return bktlist
  }

  addBucketlists() {
    console.log("We got here")
  }

  getBucketlists(): BucketList[]{
    
    let options = this.getToken();
    var bktlists:BucketList[] = []

    if (options){
      this.http.get('http://127.0.0.1:5000/api/v1/bucketlists', options)
        .subscribe(res => {
          var bucketlists = res.json()

          if (this.unauthorised(bucketlists)){
            return this.router.navigate(['/auth/login'])
          }
          
          if (bucketlists){
            for (var i = 0; i < bucketlists.length; i++) {
              var bucketlist = this.parseBucketlists(bucketlists, i)
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

  getToken(){
    let authToken = localStorage.getItem('auth_token');
    let headers = new Headers({ 'Accept': 'application/json' });
    if (authToken){
      headers.append('Authorization', authToken);
      return new RequestOptions({ headers: headers });
    }
    else{
      return false
    }
  }

  unauthorised(bucketlists): boolean{
    if (bucketlists.status == 401){
      return false
    }
    else if (bucketlists.status == 200 || bucketlists.status == 201){
      return true
    }
  }

}

