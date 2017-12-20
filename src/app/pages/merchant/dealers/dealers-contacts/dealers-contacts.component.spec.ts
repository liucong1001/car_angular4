import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersContactsComponent } from './dealers-contacts.component';

describe('DealersContactsComponent', () => {
  let component: DealersContactsComponent;
  let fixture: ComponentFixture<DealersContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
