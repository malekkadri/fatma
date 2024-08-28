import { TestBed } from '@angular/core/testing';

import { CreditDemandService } from './credit-demand.service';

describe('CreditDemandService', () => {
  let service: CreditDemandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditDemandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
