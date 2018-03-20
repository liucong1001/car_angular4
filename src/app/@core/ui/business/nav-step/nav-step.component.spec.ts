import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavStepComponent } from './nav-step.component';

describe('NavStepComponent', () => {
  let component: NavStepComponent;
  let fixture: ComponentFixture<NavStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
