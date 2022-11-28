import { TestBed } from '@angular/core/testing';

import { LrouteService } from './lroute.service';

describe('LrouteService', () => {
  let service: LrouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LrouteService);
  });

  it('should be created', () => {
    expect(service.ingresar('jere.zuniga','123456','false')).toBeTruthy();
  });
});
