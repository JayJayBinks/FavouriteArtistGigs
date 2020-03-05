import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../errorHandler.service';
import { MessageService } from '../../message.service';
import { ArtistList, ArtistModel } from '../artist.model';
import { ArtistService } from '../artist.service.facade';
import { TopArtist, TopArtistsResource } from './artist.model.lastfm';

@Injectable({
  providedIn: 'root'
})
export class ArtistServiceLastfm implements ArtistService {

  artists: TopArtist[] = [];
  artistsResource: TopArtistsResource = null;
  private user = environment.lastFmUser;
  private apiKey: string = environment.lastFmApiKey;
  private baseUrl = 'http://ws.audioscrobbler.com/2.0/';
  private topArtistsURL = this.baseUrl + '?method=user.gettopartists&user='
    + this.user + '&api_key=' + this.apiKey + '&limit=10&format=json';

  constructor(private messageService: MessageService, private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  getRank(artist: TopArtist): number {
    return Number(artist['@attr'].rank);
  }

  // TODO map this correctly
  getTopArtists(): Observable<ArtistList> {
    if (this.artistsResource !== null) {
      return of(this.artistsResource as unknown as ArtistList);
    }
    return this.http.get<TopArtistsResource>(this.topArtistsURL)
      .pipe(
        catchError(this.errorHandlerService.handleError<TopArtistsResource>('getTopArtists', null)),
        tap(resource => {
          this.log('fetched artists');
          this.artists = resource.topartists.artist;
          this.artistsResource = resource;
        }),
        map(r => r as unknown as ArtistList));
  }

  getArtist(id: number): Observable<ArtistModel> {
    // TODO map this correctly
    return of(this.artists.find(artist => this.getRank(artist) === id) as unknown as ArtistModel)
      .pipe(tap(artist => this.log(`fetched artist id=${id} ${artist.name}`)));
  }

  login(token: string) {
  }

  private log(message: string) {
    this.messageService.add(`ArtistServiceLastfm: ${message}`);
  }

}
