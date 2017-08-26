import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { BucketlistItemsService } from './../../../services/bucketlist-items.service';
import { UserService } from './../../../services/user.service';
import { BucketToolsService } from './../../../services/bucket-tools.service'


import { BucketlistComponent } from './../bucketlists.component';
import { BucketList } from './../../../models/bucketlist';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';


@Component({
  selector: 'app-bucket-items',
  templateUrl: './bucket-items.component.html',
  styleUrls: ['./bucket-items.component.css'],
})
export class BucketItemsComponent implements OnInit {

  bucket: BucketList;

  constructor(
    private itemService: BucketlistItemsService,
    private bucketTools: BucketToolsService,
    private user: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.getBucket(params['id']);
      });
  }

  getBucket(id){

    this.itemService.getSingleBucket(id).subscribe(bucketlist => {

        if (bucketlist){
          this.bucket = this.bucketTools.parseBucketlists(bucketlist)
        }
        console.log(this.bucket);
      });
  }

  delete(bucket_id, item_id){
    this.itemService.deleteItem(bucket_id, item_id).subscribe(response => {

      if(response){
        this.getBucket(bucket_id)
      }
    });
  }

  goBack(): void{
        this.location.back()
  }
}
