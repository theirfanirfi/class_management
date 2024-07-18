import { TestBed } from '@angular/core/testing';

import { AuthSupaBaseServiceService } from './auth-supa-base-service.service';

describe('AuthSupaBaseServiceService', () => {
  let service: AuthSupaBaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSupaBaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
