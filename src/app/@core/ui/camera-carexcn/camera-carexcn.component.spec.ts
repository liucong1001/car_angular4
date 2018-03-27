import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCarexcnComponent } from './camera-carexcn.component';

describe('CameraCarexcnComponent', () => {
  let component: CameraCarexcnComponent;
  let fixture: ComponentFixture<CameraCarexcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraCarexcnComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraCarexcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
