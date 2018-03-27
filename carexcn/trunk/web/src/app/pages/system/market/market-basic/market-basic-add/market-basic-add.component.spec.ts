import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBasicAddComponent } from './market-basic-add.component';

describe('MarketBasicAddComponent', () => {
  let component: MarketBasicAddComponent;
  let fixture: ComponentFixture<MarketBasicAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketBasicAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketBasicAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
