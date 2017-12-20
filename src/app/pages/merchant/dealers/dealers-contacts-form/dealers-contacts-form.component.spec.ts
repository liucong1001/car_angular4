import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersContactsFormComponent } from './dealers-contacts-form.component';

describe('DealersContactsFormComponent', () => {
  let component: DealersContactsFormComponent;
  let fixture: ComponentFixture<DealersContactsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersContactsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersContactsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
