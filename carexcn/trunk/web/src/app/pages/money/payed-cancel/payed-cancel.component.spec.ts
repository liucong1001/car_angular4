import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedCancelComponent } from './payed-cancel.component';

describe('PayedCancelComponent', () => {
  let component: PayedCancelComponent;
  let fixture: ComponentFixture<PayedCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayedCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayedCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
