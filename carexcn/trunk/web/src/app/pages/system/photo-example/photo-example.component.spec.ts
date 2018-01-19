import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoExampleComponent } from './photo-example.component';

describe('PhotoExampleComponent', () => {
  let component: PhotoExampleComponent;
  let fixture: ComponentFixture<PhotoExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
