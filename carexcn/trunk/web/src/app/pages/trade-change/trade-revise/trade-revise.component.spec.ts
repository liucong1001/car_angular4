import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeReviseComponent } from './trade-revise.component';

describe('TradeReviseComponent', () => {
  let component: TradeReviseComponent;
  let fixture: ComponentFixture<TradeReviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeReviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeReviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
