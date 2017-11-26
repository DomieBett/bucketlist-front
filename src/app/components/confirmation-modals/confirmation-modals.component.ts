import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-modals',
  templateUrl: './confirmation-modals.component.html',
  styleUrls: ['./../modals.css', './confirmation-modals.component.css']
})
export class ConfirmationModalsComponent implements OnInit {

  @Input() type = 'delete';
  @Input() item = 'bucket';
  @ViewChild('confirmationModal') confirmationModal: ElementRef;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Check if clicked event target is inside the modal
   */
  @HostListener('click')
  onClick() {
    if (!this.confirmationModal.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }

  /**
   * Close this modal
   */
  closeModal() {
    this.close.emit();
  }
}
