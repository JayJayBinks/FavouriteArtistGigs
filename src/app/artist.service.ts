import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { TopArtist, TopArtistsResource } from './topArtistsResource';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  artists: TopArtist[] = [];
  artistsResource: TopArtistsResource = null;
  private user = 'tbrmaster';
  private apiKey: string = environment.lastFmApiKey;
  private baseUrl = 'http://ws.audioscrobbler.com/2.0/';
  private topArtistsURL = this.baseUrl + '?method=user.gettopartists&user=' + this.user + '&api_key=' + this.apiKey + '&limit=10&format=json';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  static getRank(artist: TopArtist): number {
    return artist['@attr'].rank;
  }

  getTopArtists(): Observable<TopArtistsResource> {
    if (this.artistsResource !== null) {
      return of(this.artistsResource);
    }
    return this.http.get<TopArtistsResource>(this.topArtistsURL)
      .pipe(tap(resource => {
        this.log('fetched artists');
        this.artists = resource.topartists.artist;
        this.artistsResource = resource;
      }));
  }

  getArtist(id: number): Observable<TopArtist> {
    return of(this.artists.find(artist => ArtistService.getRank(artist) === id))
      .pipe(tap(artist => this.log(`fetched artist id=${id} ${artist.name}`)));
  }

  private log(message: string) {
    this.messageService.add(`ArtistService: ${message}`);
  }

}
