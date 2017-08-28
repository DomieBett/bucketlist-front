import { Injectable } from '@angular/core';

import { BucketList, Item } from './../models/bucketlist';

@Injectable()
export class BucketToolsService {

    parseItems(bucketlist): Item[]{
        // Convert retrieved api json items to Item objects.
        let items: Item[];

        for (var i = 0; i < bucketlist.items.length; i++) {

            let data = bucketlist.items[i];
            // Create new Item object from json data.
            let item = new Item(
                data.id, data.name, data.date_created,
                data.date_modified, data.done
            );
            // Push item objects to array.
            items.push(item);
        }
        // Return array of items objects. 
        return items
    }

    parseBucketlists(bucketlist): BucketList{

        //Convert bucketlists from json to Bucketlist object.
        let bktlist = new BucketList(
            bucketlist.id, bucketlist.name, bucketlist.items, 
            bucketlist.date_created, bucketlist.date_modifed,
            bucketlist.created_by
        )
        return bktlist
    }
}