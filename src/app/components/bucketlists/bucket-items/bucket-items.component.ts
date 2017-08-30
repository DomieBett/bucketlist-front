import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { BucketItemsService } from './../../../services/bucket-items.service';
import { UserService } from './../../../services/user.service';
import { BucketToolsService } from './../../../services/bucket-tools.service';
import { ModalService } from './../../../services/modal.service';

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
            console.log(params['id']);
        });
    }

    getBucket(id){

        let response = this.itemService.getSingleBucket(id);

        if (!response)
            return false

        response.subscribe(response => {
            if (response.status == 401)
                this.router.navigate(['/auth/login'])
            else if (response.status == 200)
                this.bucket = this.bucketTools
                    .parseBucketlists(response.json());
        });
    }

    addItem(){

        let response = this.itemService.addItem(
            this.ids.bucket_id,
            this.model.name
        )

        if (!response)
            return false

        response.subscribe(response => {

            if (response.status == 401)
                this.router.navigate(['/auth/login']);
            else if (response.status == 201)
                this.getBucket(this.ids.bucket_id);
        });
    }

    delete(){

        let response = this.itemService.deleteItem(
            this.ids.bucket_id,
            this.ids.item_id
        );

        if (!response)
            return false

        response.subscribe(response => {

            if (response.status == 401)
                this.router.navigate(['/auth/login']);
            else if (response.status == 200)
                this.router.navigate(['/auth/login']);
        });
    }

    updateItem(){
        let done: boolean = false;
        if (this.model.done)
            done = this.model.done
        let response = this.itemService.updateItem(
            this.ids.bucket_id,
            this.ids.item_id,
            this.model.name,
            done
        )

        if (!response)
            return false

        response.subscribe(response => {

            if (response.status == 401)
                this.router.navigate(['/auth/login']);
            else if (response.status == 201)
                this.getBucket(this.ids.bucket_id);
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
