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
    showBucketItemModal = false;
    modalBucket: any;
    pages: any = {
        next: null,
        previous: null,
        current: null,
        total: null,
    };
    ids: any = {};

    showInputModal: boolean;
    showConfirmationModal: boolean;
    modalItem = 'bucket';
    modalType: string;
    inputModalLabel: string;

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

    /**
     * Query API for bucketlists
     *
     * @param page pagination page number
     */
    getBucketlists(page) {

        const response = this.bucketlistsService.getBucketlists(page);

        if (!response) {
            return 'No response';
        }

        response.subscribe((response) => {
            this.bucketlists = [];
            const bucketlists = response.json().bucketlists;
            const links = response.json().links;
            console.log(links);
            this.pages.previous = links[0].id;
            this.pages.next = links[1].id;
            this.pages.current = links[2].id;
            this.pages.total = links[3].id;

            if (bucketlists) {
                for (let i = 0; i < bucketlists.length; i++) {
                    const bucketlist = this.bucketTools.parseBucketlists(bucketlists[i]);
                    this.bucketlists.push(bucketlist);
                }
            }
        },
            (err: any) => {
                this.errorHandler(err);
            }
        );
    }

    /**
     * Calls endpoint to add bucketlist
     */
    addBucketlist() {

        const response = this.bucketlistsService.addBucketlist(this.model.name);

        if (!response) {
            return false;
        }

        response.subscribe((response) => {

            if (response.status === 401) {
                this.router.navigate(['/auth/login']);
            } else if (response.status === 201) {
                this.getBucketlists(this.pages.current);
            }
        },
            (err: any) => {
                this.errorHandler(err);
            });
    }

    /**
     * Calls endpoint to update bucketlist
     */
    updateBucketlist() {
        console.log('Model: ' + this.model.name);

        const id = this.ids.bucket_id;
        const response = this.bucketlistsService.updateBucketlist(
            id, this.model.name);

        if (!response) {
            return;
        }
        response.subscribe((response) => {

            if (response.status === 401) {
                return this.router.navigate(['/auth/login']);
            } else if (response.status === 201) {
                this.getBucketlists(this.pages.current);
            }

        },
            (err: any) => {
                this.errorHandler(err);
            });
    }

    /**
     * Calls endpoint to delete bucketlist
     */
    deleteBucketlist() {

        const id = this.ids.bucket_id;
        const response = this.bucketlistsService.deleteBucketlists(id);

        if (!response) {
            return;
        }

        response.subscribe((response) => {

            if (response.status === 401) {
                this.router.navigate(['/auth/login']);
            } else if (response.json().status === 'success') {
                this.getBucketlists(this.pages.current);
            }
        },
            (err: any) => {
                this.errorHandler(err);
            });

        this.router.navigate(['bucketlists/']);
    }

    /**
     * Get specific page number
     *
     * @param page pagination page number
     */
    getPage(page) {
        if (page) {
            this.getBucketlists(page);
        }
    }

    /**
     * Opens modal with corresponding name and binds data to it
     *
     * @param name - the name of the modal
     * @param modalData - either bucketlist or modal type
     *      depending on the modal name
     */
    openModal(name, modalData) {
        if (name === 'input') {
            this.showInputModal = true;
            this.modalType = modalData;
        } else if (name === 'confirmation') {
            this.showConfirmationModal = true;
            this.modalType = modalData;
        } else if (name === 'bucketItem') {
            this.showBucketItemModal = true;
            this.modalBucket = modalData;
        }
    }

    /**
     * Close modal with corresponding name
     *
     * @param name - the name of the modal
     */
    closeModal(event, name) {
        console.log('Closing');
        if (name === 'bucketItem') {
            this.showBucketItemModal = false;
        } else if (name === 'confirmation') {
            this.showConfirmationModal = false;
        } else if (name === 'input') {
            this.showInputModal = false;
        }
    }

    /**
     * Used to handle errors and redirect to error page
     *
     * @param error error received
     */
    errorHandler(error) {
        if (error.status === 401) {
            this.authService.logout();
            return this.router.navigate(['/auth/login']);
        } else {
            const url = 'error/' + error.status;
            this.router.navigate([url]);
        }
    }

    /**
     * Prevents click event propagation if item in another clickable
     * element is clicked
     *
     * @param event click event
     */
    onEvent(event) {
        event.stopPropagation();
    }
}
