import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Trecording2Component } from './trecording2.component';

describe('Trecording2Component', () => {
  let component: Trecording2Component;
  let fixture: ComponentFixture<Trecording2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Trecording2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Trecording2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
