import { TestBed } from '@angular/core/testing';

import { SelectedSellerService } from './selected-seller-service';

describe('SelectedSellerService', () => {
  let service: SelectedSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
