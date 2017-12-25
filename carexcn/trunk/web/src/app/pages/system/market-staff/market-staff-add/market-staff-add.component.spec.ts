import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketStaffAddComponent } from './market-staff-add.component';

describe('MarketStaffAddComponent', () => {
  let component: MarketStaffAddComponent;
  let fixture: ComponentFixture<MarketStaffAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketStaffAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketStaffAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
