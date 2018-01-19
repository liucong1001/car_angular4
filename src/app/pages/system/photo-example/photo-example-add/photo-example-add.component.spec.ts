import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoExampleAddComponent } from './photo-example-add.component';

describe('PhotoExampleAddComponent', () => {
  let component: PhotoExampleAddComponent;
  let fixture: ComponentFixture<PhotoExampleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoExampleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoExampleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
