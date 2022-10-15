import { TestBed } from '@angular/core/testing';

import { BDviajeService } from './bdviaje.service';

describe('BDviajeService', () => {
  let service: BDviajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BDviajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
