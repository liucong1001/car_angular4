import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrecordingComponent } from './trecording.component';

describe('TrecordingComponent', () => {
  let component: TrecordingComponent;
  let fixture: ComponentFixture<TrecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
