import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFormSearchComponent } from './report-form-search.component';

describe('ReportFormSearchComponent', () => {
  let component: ReportFormSearchComponent;
  let fixture: ComponentFixture<ReportFormSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFormSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFormSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
