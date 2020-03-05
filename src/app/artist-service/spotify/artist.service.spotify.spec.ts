import { TestBed } from '@angular/core/testing';

import { ArtistServiceSpotify } from './artist.service.spotify';

describe('ArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistServiceSpotify = TestBed.get(ArtistServiceSpotify);
    expect(service).toBeTruthy();
  });
});
