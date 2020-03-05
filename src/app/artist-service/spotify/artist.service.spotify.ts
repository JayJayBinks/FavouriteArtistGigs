import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../errorHandler.service';
import { MessageService } from '../../message.service';
import { ArtistList, ArtistModel } from '../artist.model';
import { ArtistService } from '../artist.service.facade';

@Injectable({
  providedIn: 'root'
})
export class ArtistServiceSpotify implements ArtistService {
  artists: ArtistList = { items: [] };

  private clientId: string = environment.spotify_client_id;
  private redirectUri: string = environment.spotify_redirect_uri;
  private scope: string = environment.spotify_scope;
  private loginUrl = 'https://accounts.spotify.com/authorize?';
  private artisttsUrl = 'https://api.spotify.com/v1/me/top/artists';
  private token: string;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }


  login(token: string) {
    if (token) {
      this.log('obtained token');
      this.token = token;
    }
    if (this.token) {
      return;
    }
    this.log('need to login');
    let params = new HttpParams();
    params = params.set('client_id', this.clientId);
    params = params.set('response_type', 'token');
    params = params.set('redirect_uri', this.redirectUri);
    params = params.set('scope', this.scope);
    window.location.href = (this.loginUrl + params.toString());
  }

  getTopArtists(): Observable<ArtistList> {
    if (this.artists.items.length > 0) {
      return of(this.artists);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get<ArtistList>(this.artisttsUrl, { headers })
      .pipe(
        catchError(this.errorHandlerService.handleError<ArtistList>('getTopArtists', null)),
        pipe(map(resource => {
            this.log('fetched artists');
            resource.items.sort((a, b) => b.popularity - a.popularity);
            resource.items.forEach((item, index) => {
              item.rank = index + 1;
            });
            return resource as ArtistList;
          }),
          tap(resource => this.artists = resource)));
  }

  getArtist(id: number): Observable<ArtistModel> {
    return of(this.artists.items.find(artist => artist.rank === id))
      .pipe(tap(artist => this.log(`fetched artist id=${id} ${artist.name}`)));
  }

  private log(message: string) {
    this.messageService.add(`ArtistServiceSpotify: ${message}`);
  }

}
