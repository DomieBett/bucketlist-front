import { Component, OnInit, Input } from '@angular/core';

import { BucketlistComponent } from './../bucketlists.component';
import { BucketList } from './../../models/bucketlist';


@Component({
  selector: 'app-bucketlist-items',
  templateUrl: './bucketlist-items.component.html',
  styleUrls: ['./bucketlist-items.component.css']
})
export class BucketlistItemsComponent implements OnInit {

  @Input() bucket: BucketList;

  constructor(private bucketlistComponent: BucketlistComponent) { }

  ngOnInit() {
  }

  close(){
    this.bucketlistComponent.close(false)
  }

}
