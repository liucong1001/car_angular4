import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRecordingComponent } from './mobile-recording.component';

describe('MobileRecordingComponent', () => {
  let component: MobileRecordingComponent;
  let fixture: ComponentFixture<MobileRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
