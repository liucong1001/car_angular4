import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeKeepComponent } from './recharge-keep.component';

describe('RechargeKeepComponent', () => {
  let component: RechargeKeepComponent;
  let fixture: ComponentFixture<RechargeKeepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeKeepComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeKeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
