import { TestBed } from '@angular/core/testing';

import { DetailsListService } from './details-list.service';

describe('DetailsListService', () => {
  let service: DetailsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
