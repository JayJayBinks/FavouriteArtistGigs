import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gig } from './gig';
import { MessageService } from './message.service';
import { GIGS } from './mock-gigs';

@Injectable({
  providedIn: 'root'
})
export class GigService {

  constructor(private messageService: MessageService) { }

  getGigs(): Observable<Gig[]> {
    this.messageService.add('GigService: fetched gigs');
    return of(GIGS);
  }
}
