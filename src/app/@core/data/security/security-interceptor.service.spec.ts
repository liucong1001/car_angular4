import { TestBed, inject } from '@angular/core/testing';

import { SecurityInterceptorService } from './security-interceptor.service';

describe('SecurityInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityInterceptorService]
    });
  });

  it('should be created', inject([SecurityInterceptorService], (service: SecurityInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
