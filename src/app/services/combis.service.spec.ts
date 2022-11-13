import { TestBed } from '@angular/core/testing';

import { CombisService } from './combis.service';

describe('CombisService', () => {
  let service: CombisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
