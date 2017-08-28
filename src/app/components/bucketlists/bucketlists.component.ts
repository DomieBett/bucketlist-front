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
        // Retrieve all bucketlists on component start up.
        this.getBucketlists()
    }

    addBucketlist(){

        // Send data to service add bucketlist function.
        this.bucketlistsService.addBucketlist(this.model.name)
            .subscribe(response => {

            let bucketlist = response.json()

            // If unauthorised, redirect to login page.
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

                // If unauthorised, redirect to login page.
                if (response.status == 401)
                    this.router.navigate(['/auth/login'])

                // Get Bucketlist objects and push them to array.
                else if (bucketlists) {
                    for (var i = 0; i < bucketlists.length; i++) {
                        var bucketlist = this.bucketTools.parseBucketlists(bucketlists[i]);
                        this.bucketlists.push(bucketlist);
                    }
                }
            });
    }

    deleteBucketlist(){
        // Deletes bucketlists.
        let id = this.deletebucketid
        this.bucketlistsService.deleteBucketlists(id)
            .subscribe(response => {

                let status = response.json().status;

                // Redirect to login page if unauthorised.
                if (response.status == 401)
                    this.router.navigate(['/auth/login'])
                else if (status == "success"){
                    this.getBucketlists();
                }
            });
        this.router.navigate(['bucketlists/']);
    }

    openModal(id: string){
        // Open modal with id specified.
        this.modalService.open(id);
    }

    closeModal(id: string){
        // Close modal with the specified id.
        this.modalService.close(id);
    }

    toDelete(bucket){
        // Save bucketlist id to be deleted if confirmed by user.
        this.deletebucketid = bucket.id
    }
    
    onSelect(bucket: BucketList){
        // Redirect to items once bucket is clicked.
        this.selectedBucket = bucket;
        this.router.navigate(['bucketlists/'
            + bucket.id + '/items']);
    }

    onAdd(){ }
}
