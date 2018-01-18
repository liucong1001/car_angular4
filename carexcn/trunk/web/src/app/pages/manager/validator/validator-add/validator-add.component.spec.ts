import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorAddComponent } from './validator-add.component';

describe('ValidatorAddComponent', () => {
  let component: ValidatorAddComponent;
  let fixture: ComponentFixture<ValidatorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
