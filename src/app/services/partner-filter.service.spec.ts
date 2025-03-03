import { TestBed } from '@angular/core/testing';

import { PartnerFilterService } from './partner-filter.service';

describe('PartnerFilterService', () => {
  let service: PartnerFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
