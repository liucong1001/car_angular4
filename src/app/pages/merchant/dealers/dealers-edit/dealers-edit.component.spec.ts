import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersEditComponent } from './dealers-edit.component';

describe('DealersEditComponent', () => {
  let component: DealersEditComponent;
  let fixture: ComponentFixture<DealersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
