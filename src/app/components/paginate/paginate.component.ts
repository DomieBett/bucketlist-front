import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {

  @Input() pages;
  @Output() page: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Get specific page
   * @param page page number
   */
  getPage(page) {
    this.page.emit(page);
  }
}
