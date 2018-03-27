import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBasicEditComponent } from './market-basic-edit.component';

describe('MarketBasicEditComponent', () => {
  let component: MarketBasicEditComponent;
  let fixture: ComponentFixture<MarketBasicEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketBasicEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketBasicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
