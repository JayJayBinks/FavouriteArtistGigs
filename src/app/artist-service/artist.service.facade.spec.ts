import { TestBed } from '@angular/core/testing';

import { ArtistServiceFacade } from './artist.service.facade';

describe('ArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistServiceFacade = TestBed.get(ArtistServiceFacade);
    expect(service).toBeTruthy();
  });
});
