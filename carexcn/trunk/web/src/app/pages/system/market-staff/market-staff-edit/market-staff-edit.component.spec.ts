import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketStaffEditComponent } from './market-staff-edit.component';

describe('MarketStaffEditComponent', () => {
  let component: MarketStaffEditComponent;
  let fixture: ComponentFixture<MarketStaffEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketStaffEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketStaffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
