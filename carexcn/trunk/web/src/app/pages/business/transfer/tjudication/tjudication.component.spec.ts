import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TjudicationComponent } from './tjudication.component';

describe('TjudicationComponent', () => {
  let component: TjudicationComponent;
  let fixture: ComponentFixture<TjudicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TjudicationComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TjudicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
