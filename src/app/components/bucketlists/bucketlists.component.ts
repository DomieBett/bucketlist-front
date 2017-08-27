import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BucketlistsService } from './../../services/bucketlists.service';
import { BucketItemsService } from './../../services/bucket-items.service';
import { BucketToolsService } from './../../services/bucket-tools.service';
import { UserService } from './../../services/user.service';
import { ModalService } from './../../services/modal.service';

import { BucketList } from './../../models/bucketlist';


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
  deletebucketid: number;

  constructor(
    private bucketlistsService: BucketlistsService,
    private bucketItemService: BucketItemsService,
    private bucketTools: BucketToolsService,
    private modalService: ModalService,
    private router: Router,
    private user: UserService
    ) { }

  ngOnInit() {
     this.getBucketlists()
  }

  addBucketlist(){

    this.bucketlistsService.addBucketlist(this.model.name)
      .subscribe(response => {
        let bucketlist = response.json()

        if (response.status == 401)
            this.router.navigate(['/auth/login'])

         else if (bucketlist)
           console.log(bucketlist);
      });
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

  deleteBucketlist(){

    let id = this.deletebucketid
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

  toDelete(bucket){
    this.deletebucketid = bucket.id
    console.log("Before" + bucket.id)
    console.log("After" + this.deletebucketid)
  }

  openModal(id: string){
      this.modalService.open(id);
  }

  closeModal(id: string){
      this.modalService.close(id);
  }
}
