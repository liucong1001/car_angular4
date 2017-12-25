import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketStaffComponent } from './market-staff.component';

describe('MarketStaffComponent', () => {
  let component: MarketStaffComponent;
  let fixture: ComponentFixture<MarketStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
