import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketFeeEditComponent } from './market-fee-edit.component';

describe('MarketFeeEditComponent', () => {
  let component: MarketFeeEditComponent;
  let fixture: ComponentFixture<MarketFeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketFeeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketFeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
