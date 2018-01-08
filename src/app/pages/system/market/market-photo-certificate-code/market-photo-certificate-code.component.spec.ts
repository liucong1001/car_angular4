import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPhotoCertificateCodeComponent } from './market-photo-certificate-code.component';

describe('MarketPhotoCertificateCodeComponent', () => {
  let component: MarketPhotoCertificateCodeComponent;
  let fixture: ComponentFixture<MarketPhotoCertificateCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketPhotoCertificateCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPhotoCertificateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
