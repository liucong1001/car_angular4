import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBasicComponent } from './market-basic.component';

describe('MarketBasicComponent', () => {
  let component: MarketBasicComponent;
  let fixture: ComponentFixture<MarketBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
