import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { BucketlistItemsService } from './../services/bucketlist-items.service';
import { GlobalService } from '../services/global.services';

import { BucketlistComponent } from './../bucketlists.component';
import { BucketList } from './../../models/bucketlist';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';


@Component({
  selector: 'app-bucketlist-items',
  templateUrl: './bucketlist-items.component.html',
  styleUrls: ['./bucketlist-items.component.css'],
  providers: [BucketlistItemsService]
})
export class BucketlistItemsComponent implements OnInit {

  bucket: BucketList;
  bktlist: BucketList;

  constructor(
    private itemService: BucketlistItemsService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        let id = params['id'];
        this.getBucket(id)
        console.log(id);
      });
  }

    getBucket(id){

      this.itemService.getSingleBucket(id).subscribe(bucketlist => {

          if (this.globalService.unauthorised(bucketlist)){
            this.router.navigate(['/auth/login'])
          }
          else if (bucketlist){
            this.bktlist = this.globalService.parseBucketlists(bucketlist)
          }
          console.log(this.bktlist);
        });
    }

  delete(bucket_id, item_id){
    this.itemService.deleteItem(bucket_id, item_id).subscribe(response => {

      if (this.globalService.unauthorised(response)){
        this.router.navigate(['/auth/login'])
      }
      else if(response){
        this.getBucket(bucket_id)
      }
    });
  }

  goBack(): void{
        this.location.back()
  }
}
