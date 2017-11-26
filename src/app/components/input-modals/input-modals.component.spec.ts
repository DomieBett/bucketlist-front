import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputModalsComponent } from './input-modals.component';

describe('InputModalsComponent', () => {
  let component: InputModalsComponent;
  let fixture: ComponentFixture<InputModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
