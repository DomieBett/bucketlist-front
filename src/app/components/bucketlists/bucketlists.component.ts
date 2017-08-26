import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BucketlistsService } from './../../services/bucketlists.service';
import { BucketlistItemsService } from './../../services/bucketlist-items.service';
import { BucketList } from './../../models/bucketlist';
import { BucketToolsService } from './../../services/bucket-tools.service';
import { UserService } from './../../services/user.service'


@Component({
  selector: 'app-bucketlists',
  templateUrl: './bucketlists.component.html',
  styleUrls: ['./bucketlists.component.css']
})
export class BucketlistComponent implements OnInit {

  model: any = {};
  bucketlists: BucketList[] = [];
  selectedBucket: BucketList;
  add_bucket_clicked: boolean = false;

  constructor(
    private bucketlistsService: BucketlistsService,
    private bucketlistItemService: BucketlistItemsService,
    private bucketTools: BucketToolsService,
    private router: Router,
    private user: UserService
    ) { }

  ngOnInit() {
     this.getBucketlists()
  }

  addBucketlist(){
    this.bucketlistsService.addBucketlists(this.model.name)
  }

  getBucketlists(){
    this.bucketlistsService.getBucketlists()
      .subscribe(response => {
          
          this.bucketlists = [];
          let bucketlists = response.json()

          if (response.status == 401)
              this.router.navigate(['/auth/login'])

          else if (bucketlists) {
              for (var i = 0; i < bucketlists.length; i++) {
                var bucketlist = this.bucketTools.parseBucketlists(bucketlists[i]);
                this.bucketlists.push(bucketlist);
                console.log(bucketlist);
              }
          }
      });
  }

  onSelect(bucket: BucketList){
    this.selectedBucket = bucket;
    this.router.navigate(['bucketlists/' + bucket.id + '/items']);
  }

  onAdd(){ }

  delete(id){
    this.bucketlistsService.deleteBucketlists(id).subscribe(response => {

        let status = response.json().status;

        if (response.status == 401)
          this.router.navigate(['/auth/login'])
        else if (status == "success"){
          this.getBucketlists();
        }
    });
    this.router.navigate(['bucketlists/']);
  }
}
