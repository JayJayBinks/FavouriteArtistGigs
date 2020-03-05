import { TestBed } from '@angular/core/testing';

import { ArtistServiceLastfm } from './artist.service.lastfm';

describe('ArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistServiceLastfm = TestBed.get(ArtistServiceLastfm);
    expect(service).toBeTruthy();
  });
});
