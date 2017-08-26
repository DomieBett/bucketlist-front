import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BucketlistsService } from './services/bucketlists.service';
import { BucketlistItemsService } from './services/bucketlist-items.service';
import { BucketList } from './../models/bucketlist';
import { GlobalService } from './services/global.services';


@Component({
  selector: 'app-bucketlists',
  templateUrl: './bucketlists.component.html',
  styleUrls: ['./bucketlists.component.css']
})
export class BucketlistComponent implements OnInit {

  model: any = {};
  bucketlists: BucketList[];
  selectedBucket: BucketList;
  add_bucket_clicked: boolean = false;

  constructor(
    private bucketlistsService: BucketlistsService,
    private bucketlistItemService: BucketlistItemsService,
    private router: Router,
    private globalService: GlobalService
    ) { }

  ngOnInit() {
    this.bucketlists = this.bucketlistsService.getBucketlists();
    this.selectedBucket = this.bucketlists[0];
  }

  addBucketlist(){
    this.bucketlistsService.addBucketlists(this.model.name)
  }

  onSelect(bucket: BucketList){
    this.selectedBucket = bucket;
    this.router.navigate(['bucketlists/' + bucket.id + '/items']);
  }

  onAdd(){
    
  }

  delete(id){
    this.bucketlistsService.deleteBucketlists(id).subscribe(response => {

          if (this.globalService.unauthorised(response)){
            this.router.navigate(['/auth/login'])
          }
          else if (response){
            this.bucketlists = this.bucketlistsService.getBucketlists();
          }
        });
    this.router.navigate(['bucketlists/'])
  }
}
