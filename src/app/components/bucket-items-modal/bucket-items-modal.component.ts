import { Component, OnInit, ViewChild, HostListener, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bucket-items-modal',
  templateUrl: './bucket-items-modal.component.html',
  styleUrls: ['./../modals.css', './bucket-items-modal.component.css']
})
export class BucketItemsModalComponent implements OnInit {

  @Input() bucket;
  @ViewChild('itemModal') itemModal: ElementRef;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  items: any;

  constructor() { }

  ngOnInit() {
    console.log(this.bucket);
    this.items = this.bucket.items;
  }

  /**
   * Check the location of click event target in relation to the modal
   */
  @HostListener('click')
  onClick() {
    if (!this.itemModal.nativeElement.contains(event.target)) {
      this.close.emit(false);
    }
  }

}
