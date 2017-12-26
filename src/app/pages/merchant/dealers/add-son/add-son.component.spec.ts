import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSonComponent } from './add-son.component';

describe('AddSonComponent', () => {
  let component: AddSonComponent;
  let fixture: ComponentFixture<AddSonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
