import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

import { BucketList } from './../models/bucketlist';


@Injectable()
export class GlobalService {

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

  parseBucketlists(bucketlist): BucketList{

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

}
