import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPhotoFormComponent } from './dynamic-photo-form.component';

describe('DynamicPhotoFormComponent', () => {
  let component: DynamicPhotoFormComponent;
  let fixture: ComponentFixture<DynamicPhotoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicPhotoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
