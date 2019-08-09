import { TestBed } from '@angular/core/testing';

import { GigService } from './gig.service';

describe('GigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GigService = TestBed.get(GigService);
    expect(service).toBeTruthy();
  });
});
