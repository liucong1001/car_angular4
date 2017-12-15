import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDaytradeComponent } from './vehicle-daytrade.component';

describe('VehicleDaytradeComponent', () => {
  let component: VehicleDaytradeComponent;
  let fixture: ComponentFixture<VehicleDaytradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDaytradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDaytradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
