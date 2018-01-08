import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPhotoFormNameComponent } from './market-photo-form-name.component';

describe('MarketPhotoFormNameComponent', () => {
  let component: MarketPhotoFormNameComponent;
  let fixture: ComponentFixture<MarketPhotoFormNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketPhotoFormNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPhotoFormNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
