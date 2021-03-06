import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BucketlistsService } from './../../services/bucketlists.service';
import { BucketItemsService } from './../../services/bucket-items.service';
import { BucketToolsService } from './../../services/bucket-tools.service';
import { UserService } from './../../services/user.service';
import { ModalService } from './../../services/modal.service';
import { AuthService } from './../../services/auth.service';

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
        private user: UserService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // Retrieve all bucketlists on component start up.
        this.getBucketlists(this.pages.current);
    }

    addBucketlist(){

        const response = this.bucketlistsService.addBucketlist(this.model.name);

        if (!response)
            return false;

        response.subscribe(response => {

            if (response.status == 401)
                this.router.navigate(['/auth/login']);
            else if (response.status == 201)
                this.getBucketlists(this.pages.current);
        },
        (err: any) => {
            this.errorHandler(err);
        });
    }

    getBucketlists(page) {

        const response = this.bucketlistsService.getBucketlists(page);

        if (!response){
            return 'No response';
        }

        response.subscribe(response => {
            this.bucketlists = [];
            const bucketlists = response.json().bucketlists;
            const links = response.json().links;
            this.pages.previous = links[0].id;
            this.pages.next = links[1].id;
            this.pages.current = links[2].id;

            if (bucketlists) {
                for (let i = 0; i < bucketlists.length; i++)
                {
                    const bucketlist = this.bucketTools.parseBucketlists(bucketlists[i]);
                    this.bucketlists.push(bucketlist);
                }
            }
        },
        (err: any) => {
            this.errorHandler(err);
        });
    }

    updateBucketlist(){
        console.log('Model: ' + this.model.name);

        const id = this.ids.bucket_id;
        const response = this.bucketlistsService.updateBucketlist(
            id, this.model.name);

        if (!response)
            return;
        response.subscribe(response => {

            if (response.status == 401)
                return this.router.navigate(['/auth/login']);
            else if (response.status == 201)
                this.getBucketlists(this.pages.current);

        },
        (err: any) => {
            this.errorHandler(err);
        });
    }

    deleteBucketlist(){

        const id = this.ids.bucket_id;
        const response = this.bucketlistsService.deleteBucketlists(id);

        if (!response)
            return;

        response.subscribe(response => {

            if (response.status == 401)
                this.router.navigate(['/auth/login']);

            else if (response.json().status == 'success')
                this.getBucketlists(this.pages.current);
        },
        (err: any) => {
            this.errorHandler(err);
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
        console.log('Bucket: ' + bucket.name);
    }

    onDelete(bucket){
        // Save bucketlist id to be deleted if confirmed by user.
        this.ids.bucket_id = bucket.id;
    }

    onSelect(bucket: BucketList){
        // Redirect to items once bucket is clicked.
        this.selectedBucket = bucket;
        this.router.navigate(['bucketlists/'
            + bucket.id + '/items']);
    }

    errorHandler(error){
        if (error.status == 401){
            this.authService.logout();
            return this.router.navigate(['/auth/login']);
        }
        else {
            const url = 'error/' + error.status;
            this.router.navigate([url]);
        }
    }

    onEvent(event) {
        event.stopPropagation();
    }
}
