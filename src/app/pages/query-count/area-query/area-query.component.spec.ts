import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaQueryComponent } from './area-query.component';

describe('AreaQueryComponent', () => {
  let component: AreaQueryComponent;
  let fixture: ComponentFixture<AreaQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
