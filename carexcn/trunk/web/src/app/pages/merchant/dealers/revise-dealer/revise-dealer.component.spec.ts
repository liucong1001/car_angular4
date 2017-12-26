import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseDealerComponent } from './revise-dealer.component';

describe('ReviseDealerComponent', () => {
  let component: ReviseDealerComponent;
  let fixture: ComponentFixture<ReviseDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviseDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
