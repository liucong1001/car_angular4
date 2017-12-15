import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearTradeComponent } from './year-trade.component';

describe('YearTradeComponent', () => {
  let component: YearTradeComponent;
  let fixture: ComponentFixture<YearTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
