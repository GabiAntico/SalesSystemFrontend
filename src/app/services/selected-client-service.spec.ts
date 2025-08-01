import { TestBed } from '@angular/core/testing';

import { SelectedClientService } from './selected-client-service';

describe('SelectedClientService', () => {
  let service: SelectedClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
