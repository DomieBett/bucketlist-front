import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { BucketItemsService } from './../../../services/bucket-items.service';
import { UserService } from './../../../services/user.service';
import { BucketToolsService } from './../../../services/bucket-tools.service';
import { ModalService } from './../../../services/modal.service';


import { BucketlistComponent } from './../bucketlists.component';
import { BucketList } from './../../../models/bucketlist';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';


@Component({
    selector: 'app-bucket-items',
    templateUrl: './bucket-items.component.html',
    styleUrls: ['./bucket-items.component.css'],
})
export class BucketItemsComponent implements OnInit {

    model: any = {};
    bucket: BucketList;
    ids: any = {};

    constructor(
        private itemService: BucketItemsService,
        private bucketTools: BucketToolsService,
        private user: UserService,
        private modalService: ModalService,
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
            this.bucket = this.bucketTools.parseBucketlists(bucketlist);
        }
        console.log(this.bucket);
        });
    }

    addItem(){
        this.itemService.addItem(
            this.ids.bucket_id,
            this.model.name
        ).subscribe(item => {
            this.getBucket(this.ids.bucket_id);
        });
    }

    delete(){

        this.itemService.deleteItem(
            this.ids.bucket_id,
            this.ids.item_id
        ).subscribe(response => {

            if(response){
                this.getBucket(this.ids.bucket_id)
            }
        });
    }

    updateItem(){
        let done: boolean = false;
        if (this.model.done)
            done = this.model.done

        this.itemService.updateItem(
            this.ids.bucket_id,
            this.ids.item_id,
            this.model.name,
            done
        ).subscribe(response => {

            if (response){
                this.getBucket(this.ids.bucket_id);
            }
        });
    }

    openModal(id: string){
        // Open modal with id specified.
        this.modalService.open(id);
    }

    closeModal(id: string){
        // Close modal with the specified id.
        this.modalService.close(id);
    }

    onDelete(bucket, item){
        // Save bucketlist id to be deleted if confirmed by user.
        this.ids.bucket_id = bucket.id;
        this.ids.item_id = item.id;
    }

    onUpdate(bucket, item){
        this.ids.bucket_id = bucket.id;
        this.ids.item_id = item.id;
        this.model.name = item.name;
    }

    onAdd(bucket){
        this.ids.bucket_id = bucket.id;
    }

    goBack(): void{
        this.location.back()
    }
}
