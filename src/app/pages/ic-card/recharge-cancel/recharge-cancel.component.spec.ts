import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeCancelComponent } from './recharge-cancel.component';

describe('RechargeCancelComponent', () => {
  let component: RechargeCancelComponent;
  let fixture: ComponentFixture<RechargeCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
