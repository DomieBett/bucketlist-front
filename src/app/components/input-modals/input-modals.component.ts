import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-modals',
  templateUrl: './input-modals.component.html',
  styleUrls: ['./../modals.css', './input-modals.component.css']
})
export class InputModalsComponent implements OnInit {

  @Input() type;
  @Input() label = 'Name';
  @Input() item = 'bucket';
  @ViewChild('inputModal') inputModal: ElementRef;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Check if clicked event target is inside the modal
   */
  @HostListener('click')
  onClick() {
    if (!this.inputModal.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit(false);
  }
}
