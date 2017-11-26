import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  status_code: number;
  status_text: string;

  errors = {
    not_found: [404, 'This page is unavailable']
  };

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.displayErrors(params['status']);
    });
  }

  displayErrors(status) {
    if (status === 404) {
      this.selectErrors(this.errors.not_found);
    }
  }

  selectErrors(error) {
    this.status_code = error[0];
    this.status_text = error[1];
  }
}
