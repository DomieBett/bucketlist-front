import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

import { SearchService } from './../../services/search.service';
import { BucketItemsService } from './../../services/bucket-items.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent {
  bucketlists: Object;
  searchTerm$ = new Subject<string>();
  searchQuery: string;

  constructor(
    private searchService: SearchService,
    private itemsService: BucketItemsService,
    private router: Router
  ) {

    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        if (this.searchQuery.length > 0) {
          this.bucketlists = results.bucketlists;
        } else {
          this.bucketlists = '';
        }
      });
  }

  openBucket(bucket_id) {
    const url = '/bucketlists/' + bucket_id + '/items/';
    this.router.navigate([url]);
  }
}
