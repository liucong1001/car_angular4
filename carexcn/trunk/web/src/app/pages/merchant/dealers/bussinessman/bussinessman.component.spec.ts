import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessmanComponent } from './bussinessman.component';

describe('BussinessmanComponent', () => {
  let component: BussinessmanComponent;
  let fixture: ComponentFixture<BussinessmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
