import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayAgainComponent } from './pay-again.component';

describe('PayAgainComponent', () => {
  let component: PayAgainComponent;
  let fixture: ComponentFixture<PayAgainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayAgainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
