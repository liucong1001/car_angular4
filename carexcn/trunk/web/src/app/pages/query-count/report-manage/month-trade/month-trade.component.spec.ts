import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthTradeComponent } from './month-trade.component';

describe('MonthTradeComponent', () => {
  let component: MonthTradeComponent;
  let fixture: ComponentFixture<MonthTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
