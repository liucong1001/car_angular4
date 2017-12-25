import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidErrorComponent } from './valid-error.component';

describe('ValidErrorComponent', () => {
  let component: ValidErrorComponent;
  let fixture: ComponentFixture<ValidErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
