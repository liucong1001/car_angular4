import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesQueryComponent } from './trades-query.component';

describe('TradesQueryComponent', () => {
  let component: TradesQueryComponent;
  let fixture: ComponentFixture<TradesQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradesQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradesQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
