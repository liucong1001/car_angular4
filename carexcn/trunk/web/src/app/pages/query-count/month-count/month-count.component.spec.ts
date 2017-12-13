import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCountComponent } from './month-count.component';

describe('MonthCountComponent', () => {
  let component: MonthCountComponent;
  let fixture: ComponentFixture<MonthCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
