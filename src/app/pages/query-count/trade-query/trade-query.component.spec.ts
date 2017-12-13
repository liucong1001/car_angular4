import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeQueryComponent } from './trade-query.component';

describe('TradeQueryComponent', () => {
  let component: TradeQueryComponent;
  let fixture: ComponentFixture<TradeQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
