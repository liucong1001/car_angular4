import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroplistComponent } from './droplist.component';

describe('DroplistComponent', () => {
  let component: DroplistComponent;
  let fixture: ComponentFixture<DroplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
