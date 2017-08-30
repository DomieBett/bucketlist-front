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
    pages: any = {
        next: null,
        previous: null,
        current: null
    };
    ids: any = {};

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
        this.getBucketlists(this.pages.current)
    }

    addBucketlist(){

        let response = this.bucketlistsService.addBucketlist(this.model.name)

        if (!response)
            return false

        response.subscribe(response => {

            if (response.status == 401)
                this.router.navigate(['/auth/login']);
            else if (response.status == 201)
                this.getBucketlists(this.pages.current);
        });
    }

    getBucketlists(page){

        let response = this.bucketlistsService.getBucketlists(page);

        if (!response)
            return
        response.subscribe(response => {

            if (response.status == 401)
                return this.router.navigate(['/auth/login']);

            this.bucketlists = [];
            let bucketlists = response.json().bucketlists;
            let links = response.json().links;
            this.pages.prevous = links[0].id;
            this.pages.next = links[1].id;
            this.pages.current = links[2].id;

            if (bucketlists) {
                for (let i = 0; i < bucketlists.length; i++)
                {
                    let bucketlist = this.bucketTools.parseBucketlists(bucketlists[i]);
                    this.bucketlists.push(bucketlist);
                }
            }
        });
    }

    updateBucketlist(){
        let id = this.ids.bucket_id;
        let response = this.bucketlistsService.updateBucketlist(
            id, this.model.name)

        if (!response)
            return
        response.subscribe(response => {

            if (response.status == 401)
                return this.router.navigate(['/auth/login'])
            else if (response.status == 201)
                this.getBucketlists(this.pages.current);

        });
    }

    deleteBucketlist(){

        let id = this.ids.bucket_id;
        let response = this.bucketlistsService.deleteBucketlists(id)

        if (!response)
            return

        response.subscribe(response => {

            if (response.status == 401)
                this.router.navigate(['/auth/login']);

            else if (response.json().status == "success")
                this.getBucketlists(this.pages.current)
        });

        this.router.navigate(['bucketlists/']);
    }

    getPage(page) {

        if (page)
            this.getBucketlists(page);
    }

    openModal(id: string){
        // Open modal with id specified.
        this.modalService.open(id);
    }

    closeModal(id: string){
        // Close modal with the specified id.
        this.modalService.close(id);
    }

    onUpdate(bucket){
        this.ids.bucket_id = bucket.id;
        this.model.name = bucket.name;
    }

    onDelete(bucket){
        // Save bucketlist id to be deleted if confirmed by user.
        this.ids.bucket_id = bucket.id
    }
    
    onSelect(bucket: BucketList){
        // Redirect to items once bucket is clicked.
        this.selectedBucket = bucket;
        this.router.navigate(['bucketlists/'
            + bucket.id + '/items']);
    }
}
