import { TestBed, inject } from '@angular/core/testing';

import { MarketStaffService } from './market-staff.service';

describe('MarketStaffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketStaffService]
    });
  });

  it('should be created', inject([MarketStaffService], (service: MarketStaffService) => {
    expect(service).toBeTruthy();
  }));
});
