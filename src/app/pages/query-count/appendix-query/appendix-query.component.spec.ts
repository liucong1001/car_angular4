import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendixQueryComponent } from './appendix-query.component';

describe('AppendixQueryComponent', () => {
  let component: AppendixQueryComponent;
  let fixture: ComponentFixture<AppendixQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendixQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppendixQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
