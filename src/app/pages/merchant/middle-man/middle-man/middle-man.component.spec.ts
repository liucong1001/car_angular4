import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleManComponent } from './middle-man.component';

describe('MiddleManComponent', () => {
  let component: MiddleManComponent;
  let fixture: ComponentFixture<MiddleManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
