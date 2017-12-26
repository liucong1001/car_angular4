import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkmanComponent } from './add-linkman.component';

describe('AddLinkmanComponent', () => {
  let component: AddLinkmanComponent;
  let fixture: ComponentFixture<AddLinkmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLinkmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
