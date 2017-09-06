import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';

@Injectable()
export class SearchService {
  baseUrl: string = 'http://127.0.0.1:5000/api/v1/bucketlists/';
  queryUrl: string = '?q=';

  constructor(
    private http: Http,
    private user: UserService
  ) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {

    let options = this.user.getToken()
    
    return this.http
        .get(this.baseUrl + this.queryUrl + term,
          options)
        .map(res => res.json());
  }
}
