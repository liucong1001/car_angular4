import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TjudicationFingerComponent } from './tjudication-finger.component';

describe('TjudicationFingerComponent', () => {
  let component: TjudicationFingerComponent;
  let fixture: ComponentFixture<TjudicationFingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TjudicationFingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TjudicationFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
