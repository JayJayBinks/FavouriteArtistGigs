import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isNotNullOrUndefined } from '../../node_modules/codelyzer/util/isNotNullOrUndefined';
import { environment } from '../environments/environment';
import { GigListResource, GigResource } from './gigsResource';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class GigService {

  gigs: GigResource[] = [];
  gigResources: Map<string, GigListResource> = new Map();
  private appKey: string = environment.eventfulApiKey;
  private baseUrl = 'https://cors-anywhere.herokuapp.com/http://api.eventful.com/json';
  private searchEventsUrl = artist => this.baseUrl + '/events/search?app_key=cg9zv3dxDXtndQhr' + '' + `&keywords=${artist}&location=Germany&date=Future`;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getGigs(artist: string): Observable<GigListResource> {
    if (this.gigResources.get(artist) !== undefined) {
      return of(this.gigResources.get(artist));
    }
    return this.http.get<GigListResource>(this.searchEventsUrl(artist))
      .pipe(tap(resource => {
        this.log('fetched gigs');
        this.gigResources.set(artist, resource);
        if (isNotNullOrUndefined(resource.events)) {
          resource.events.event.forEach(gig => {
            this.gigs.push(gig);
          });
        }
      }));
  }

  getGig(id: string): Observable<GigResource> {
    // TODO: send the message _after_ fetching the hero
    this.log(`fetched gig id=${id}`);
    return of(this.gigs.find(gig => gig.id === id));
  }

  private log(message: string) {
    this.messageService.add(`GigService: ${message}`);
  }

}
