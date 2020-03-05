import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistServiceType, environment } from '../../environments/environment';
import { ArtistList, ArtistModel } from './artist.model';
import { ArtistServiceLastfm } from './lastfm/artist.service.lastfm';
import { ArtistServiceSpotify } from './spotify/artist.service.spotify';


export interface ArtistService {
  getTopArtists(): Observable<ArtistList>;

  getArtist(id: number): Observable<ArtistModel>;

  login(token: string);
}

@Injectable({
  providedIn: 'root'
})
export class ArtistServiceFacade implements ArtistService {

  service: ArtistService;

  constructor(private spotifyService: ArtistServiceSpotify,
              private lastFmService: ArtistServiceLastfm) {
    if (environment.artistServiceType === ArtistServiceType.SPOTIFY) {
      this.service = spotifyService;
    } else {
      this.service = lastFmService;
    }
  }

  getArtist(id: number): Observable<ArtistModel> {
    return this.service.getArtist(id);
  }

  getTopArtists(): Observable<ArtistList> {
    return this.service.getTopArtists();
  }

  login(token: string) {
    return this.service.login(token);
  }

  getRank(artist: ArtistModel) {
    return artist.rank;
  }
}
