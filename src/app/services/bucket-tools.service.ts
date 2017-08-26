import { Injectable } from '@angular/core';

import { BucketList, Item } from './../models/bucketlist';

@Injectable()
export class BucketToolsService {

  parseItems(bucketlist): Item[]{

      let items: Item[];

      for (var i = 0; i < bucketlist.items.length; i++) {
        let data = bucketlist.items[i];
        let item = new Item(
            data.id, data.name, data.date_created,
            data.date_modified, data.done
        );
        items.push(item);
      }

      return items
    }

    parseBucketlists(bucketlist): BucketList{

      let bktlist = new BucketList(
          bucketlist.id, bucketlist.name, bucketlist.items, 
          bucketlist.date_created, bucketlist.date_modifed,
          bucketlist.created_by
      )

      return bktlist
    }
}