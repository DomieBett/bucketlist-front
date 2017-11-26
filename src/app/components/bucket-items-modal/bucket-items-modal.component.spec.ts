import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketItemsModalComponent } from './bucket-items-modal.component';

describe('BucketItemsModalComponent', () => {
  let component: BucketItemsModalComponent;
  let fixture: ComponentFixture<BucketItemsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketItemsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
