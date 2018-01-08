import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPhotoBusinessComponent } from './market-photo-business.component';

describe('MarketPhotoBusinessComponent', () => {
  let component: MarketPhotoBusinessComponent;
  let fixture: ComponentFixture<MarketPhotoBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketPhotoBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPhotoBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
