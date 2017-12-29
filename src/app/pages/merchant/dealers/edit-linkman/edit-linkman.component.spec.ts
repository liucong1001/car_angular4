import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinkmanComponent } from './edit-linkman.component';

describe('EditLinkmanComponent', () => {
  let component: EditLinkmanComponent;
  let fixture: ComponentFixture<EditLinkmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLinkmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLinkmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
