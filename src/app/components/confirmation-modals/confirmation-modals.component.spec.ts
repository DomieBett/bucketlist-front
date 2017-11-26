import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalsComponent } from './confirmation-modals.component';

describe('ConfirmationModalsComponent', () => {
  let component: ConfirmationModalsComponent;
  let fixture: ComponentFixture<ConfirmationModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
