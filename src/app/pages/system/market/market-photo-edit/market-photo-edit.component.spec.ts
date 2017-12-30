import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPhotoEditComponent } from './market-photo-edit.component';

describe('MarketPhotoEditComponent', () => {
  let component: MarketPhotoEditComponent;
  let fixture: ComponentFixture<MarketPhotoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketPhotoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPhotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
