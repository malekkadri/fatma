import { TestBed } from '@angular/core/testing';

import { CreditSimulatorService } from './credit-simulator.service';

describe('CreditSimulatorService', () => {
  let service: CreditSimulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditSimulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
