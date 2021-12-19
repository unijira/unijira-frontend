import { TestBed } from '@angular/core/testing';

import { BacklogAPIService } from './backlog-api.service';

describe('BacklogAPIService', () => {
  let service: BacklogAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BacklogAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
