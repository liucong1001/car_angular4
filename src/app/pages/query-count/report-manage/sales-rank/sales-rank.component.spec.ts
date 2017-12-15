import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRankComponent } from './sales-rank.component';

describe('SalesRankComponent', () => {
  let component: SalesRankComponent;
  let fixture: ComponentFixture<SalesRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
