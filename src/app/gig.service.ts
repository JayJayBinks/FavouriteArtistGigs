import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isArrayLike } from 'rxjs/internal-compatibility';
import { catchError, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { isNotNullOrUndefined } from '../../node_modules/codelyzer/util/isNotNullOrUndefined';
import { environment } from '../environments/environment';
import { ErrorHandlerService } from './errorHandler.service';
import { GigListResource, GigResource, PerformerResource } from './gigsResource';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class GigService {

  constructor(private messageService: MessageService, private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  gigs: GigResource[] = [];
  gigResources: Map<string, GigListResource> = new Map();
  private appKey: string = environment.eventfulApiKey;
  private baseUrl = 'https://cors-anywhere.herokuapp.com/http://api.eventful.com/json';
  sortByDate = (a: GigResource, b: GigResource) => {
    if (isNullOrUndefined(a.start_time)) {
      return 1;
    }
    if (isNullOrUndefined(b.start_time)) {
      return -1;
    }
    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
  }
  private searchEventsUrl = artist => this.baseUrl + '/events/search?app_key=' + this.appKey + `&keywords=${artist}&category=music&location=Germany&date=Future`;

  getGigs(artist: string): Observable<GigListResource> {
    if (this.gigResources.get(artist) !== undefined) {
      return of(this.gigResources.get(artist));
    }
    return this.http.get<GigListResource>(this.searchEventsUrl(artist))
      .pipe(
        catchError(this.errorHandlerService.handleError<GigListResource>('getGigs', null)),
        tap(resource => {
          if (isNotNullOrUndefined(resource)) {
            this.log('fetched gigs');
            this.gigResources.set(artist, resource);
            if (isNotNullOrUndefined(resource.events)) {
              resource.events.event.forEach(gig => {
                this.gigs.push(gig);
              });
            }
          }
        }));
  }

  getGigsForArtists(artists: string[]): GigResource[] {
    const allGigs: GigResource[] = [];
    artists.forEach(artist => this.getGigs(artist)
      .subscribe(gigs => {
        if (isNotNullOrUndefined(gigs.events)) {
          gigs.events.event
            .forEach(gig => allGigs.push(gig));
          allGigs.sort((a, b) => this.sortByDate(a, b));
        }
      }));
    allGigs.sort((a, b) => this.sortByDate(a, b));
    return allGigs;
  }

  searchGigs(term: string): Observable<GigResource[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return of(this.gigs.filter(gig => this.searchTextFields(gig, term))).pipe(
      tap(_ => this.log(`found gigs matching "${term}"`))
    );
  }

  getGig(id: string): Observable<GigResource> {
    // TODO: send the message _after_ fetching the hero
    this.log(`fetched gig id=${id}`);
    return of(this.gigs.find(gig => gig.id === id));
  }

  getPerformers(gig): PerformerResource[] {
    const performers: PerformerResource[] = [];
    if (isNotNullOrUndefined(gig.performers)) {
      if (isArrayLike(gig.performers.performer)) {
        gig.performers.performer.forEach(performer => performers.push(performer));
      } else {
        performers.push(gig.performers.performer);
      }
    }
    return performers;
  }

  private containsIgnoreCase(text, other): boolean {
    if (isNullOrUndefined(text) || isNullOrUndefined(other)) {
      return false;
    }
    return text.toLowerCase().includes(other.toLowerCase());
  }

  private log(message: string) {
    this.messageService.add(`GigService: ${message}`);
  }

  private searchTextFields(gig: GigResource, term: string): boolean {
    if (isNotNullOrUndefined(this.getPerformers(gig).find(performer => this.containsIgnoreCase(performer.name, term)))) {
      return true;
    }
    if (this.containsIgnoreCase(gig.description, term)) {
      return true;
    }
    if (this.containsIgnoreCase(gig.venue_name, term)) {
      return true;
    }
    if (this.containsIgnoreCase(gig.country_name, term)) {
      return true;
    }
    if (this.containsIgnoreCase(gig.city_name, term)) {
      return true;
    }
    if (this.containsIgnoreCase(gig.title, term)) {
      return true;
    }
  }
}
