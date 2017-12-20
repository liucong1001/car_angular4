import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateReviseComponent } from './state-revise.component';

describe('StateReviseComponent', () => {
  let component: StateReviseComponent;
  let fixture: ComponentFixture<StateReviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateReviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateReviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
