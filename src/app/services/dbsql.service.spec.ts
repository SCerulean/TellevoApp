import { TestBed } from '@angular/core/testing';

import { dbsqlservice } from './dbsql.service';

describe('DBsqlService', () => {
  let service: dbsqlservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(dbsqlservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
