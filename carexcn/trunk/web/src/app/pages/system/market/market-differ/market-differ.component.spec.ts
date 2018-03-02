import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDifferComponent } from './market-differ.component';

describe('MarketDifferComponent', () => {
  let component: MarketDifferComponent;
  let fixture: ComponentFixture<MarketDifferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketDifferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDifferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
