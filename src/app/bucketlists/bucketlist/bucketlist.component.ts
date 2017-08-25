import { Component, OnInit } from '@angular/core';

import { BucketlistsService } from './../services/bucketlists.service';


@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.css']
})
export class BucketlistsComponent implements OnInit {

  constructor(private bucketlistService: BucketlistsService) { }

  ngOnInit() {
    
  }
}
