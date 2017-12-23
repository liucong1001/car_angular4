import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkmanComponent } from './linkman.component';

describe('LinkmanComponent', () => {
  let component: LinkmanComponent;
  let fixture: ComponentFixture<LinkmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
