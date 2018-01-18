import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorEditComponent } from './validator-edit.component';

describe('ValidatorEditComponent', () => {
  let component: ValidatorEditComponent;
  let fixture: ComponentFixture<ValidatorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
