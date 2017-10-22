import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

import { fadeInAnimation } from './../../../animations/fade-in.animation';
import { trigger, state, animate, transition, style } from '@angular/animations';

import { BucketItemsService } from './../../../services/bucket-items.service';
import { UserService } from './../../../services/user.service';
import { BucketToolsService } from './../../../services/bucket-tools.service';
import { ModalService } from './../../../services/modal.service';
import { AuthService } from './../../../services/auth.service';

import { BucketList } from './../../../models/bucketlist';


@Component({
    selector: 'app-bucket-items',
    templateUrl: './bucket-items.component.html',
    styleUrls: ['./bucket-items.component.css'],
    animations: [
      trigger('fadeInAnimation', [
          // route 'enter' transition
          transition(':enter', [

              // styles at start of transition
              style({ opacity: 0 }),

              // animation and styles at end of transition
              animate('3s', style({ opacity: 1 }))
          ]),
      ])
    ],
    host: { '[@fadeInAnimation]': '' }
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
        private location: Location,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.getBucket(params['id']);
            console.log(params['id']);
        },
        (err: any) => {
            this.errorHandler(err);
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
        },
        (err: any) => {
            this.errorHandler(err);
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
        },
        (err: any) => {
            this.errorHandler(err);
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
            else if (response.status == 200){
                this.getBucket(this.ids.bucket_id);
                console.log("Succesfully deleted" + this.ids.bucketid);
            }

        },
        (err: any) => {
            this.errorHandler(err);
        });
    }

    updateItem(){
        let done: boolean = false;
        if (this.model.done)
            done = this.model.done

        console.log(done);
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
        },
        (err: any) => {
            this.errorHandler(err);
        });
    }

    errorHandler(error){
        if (error.status == 401){
            this.authService.logout()
            return this.router.navigate(['/auth/login']);
        }
        else {
            let url = "error" + error.status;
            this.router.navigate([url]);
        }
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
