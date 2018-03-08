import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTransferComponent } from './car-transfer.component';

describe('CarTransferComponent', () => {
  let component: CarTransferComponent;
  let fixture: ComponentFixture<CarTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
