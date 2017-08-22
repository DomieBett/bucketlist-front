import { Component, OnInit } from '@angular/core';

import { BucketlistsService } from './services/bucketlists.service';
import { BucketList } from './../models/bucketlist';


@Component({
  selector: 'app-bucketlists',
  templateUrl: './bucketlists.component.html',
  styleUrls: ['./bucketlists.component.css']
})
export class BucketlistComponent implements OnInit {

  bucketlists: BucketList[];
  selectedBucket: BucketList;
  clicked: boolean = false;

  constructor(private bucketlistsService: BucketlistsService) { }

  ngOnInit() {
    this.bucketlists = this.bucketlistsService.getBucketlists();
  }

  onSelect(bucket: BucketList){
    this.selectedBucket = bucket;
    this.clicked = true;
  }

  addBucket(){
    this.bucketlistsService.addBucketlists();
  }

  close(value){
    this.clicked = false;
  }
}
