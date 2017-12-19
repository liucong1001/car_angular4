import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeRecordComponent } from './recharge-record.component';

describe('RechargeRecordComponent', () => {
  let component: RechargeRecordComponent;
  let fixture: ComponentFixture<RechargeRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
