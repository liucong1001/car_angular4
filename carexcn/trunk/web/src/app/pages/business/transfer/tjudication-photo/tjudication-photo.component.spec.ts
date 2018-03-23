import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TjudicationPhotoComponent } from './tjudication-photo.component';

describe('TjudicationPhotoComponent', () => {
  let component: TjudicationPhotoComponent;
  let fixture: ComponentFixture<TjudicationPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TjudicationPhotoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TjudicationPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
