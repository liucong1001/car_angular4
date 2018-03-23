import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveNoVehicleComponent } from './archive-no-vehicle.component';

describe('ArchiveNoVehicleComponent', () => {
  let component: ArchiveNoVehicleComponent;
  let fixture: ComponentFixture<ArchiveNoVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveNoVehicleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveNoVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
