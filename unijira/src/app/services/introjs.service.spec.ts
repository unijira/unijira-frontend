/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntrojsService } from './introjs.service';

describe('Service: Introjs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntrojsService]
    });
  });

  it('should ...', inject([IntrojsService], (service: IntrojsService) => {
    expect(service).toBeTruthy();
  }));
});
