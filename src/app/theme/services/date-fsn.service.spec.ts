import { TestBed } from '@angular/core/testing';

import { DateFsnService } from './date-fsn.service';

describe('DateFsnService', () => {
  let service: DateFsnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFsnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
