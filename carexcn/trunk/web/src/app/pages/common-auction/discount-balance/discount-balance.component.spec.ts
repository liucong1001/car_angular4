import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountBalanceComponent } from './discount-balance.component';

describe('DiscountBalanceComponent', () => {
  let component: DiscountBalanceComponent;
  let fixture: ComponentFixture<DiscountBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
