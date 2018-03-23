import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrecordingLastComponent } from './trecording-last.component';

describe('TrecordingLastComponent', () => {
  let component: TrecordingLastComponent;
  let fixture: ComponentFixture<TrecordingLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrecordingLastComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrecordingLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
