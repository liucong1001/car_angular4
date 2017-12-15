import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTradeComponent } from './day-trade.component';

describe('DayTradeComponent', () => {
  let component: DayTradeComponent;
  let fixture: ComponentFixture<DayTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
