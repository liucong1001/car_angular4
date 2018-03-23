import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessmanComponent } from './businessman.component';

describe('BusinessmanComponent', () => {
  let component: BusinessmanComponent;
  let fixture: ComponentFixture<BusinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessmanComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
