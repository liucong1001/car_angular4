import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectRecordingComponent } from './direct-recording.component';

describe('DirectRecordingComponent', () => {
  let component: DirectRecordingComponent;
  let fixture: ComponentFixture<DirectRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
