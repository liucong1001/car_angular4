import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoExampleEditComponent } from './photo-example-edit.component';

describe('PhotoExampleEditComponent', () => {
  let component: PhotoExampleEditComponent;
  let fixture: ComponentFixture<PhotoExampleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoExampleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoExampleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
