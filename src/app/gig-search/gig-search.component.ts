import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, isEmpty, switchMap, tap } from 'rxjs/operators';
import { GigService } from '../gig.service';
import { GigResource } from '../gigsResource';

@Component({
  selector: 'app-gig-search',
  templateUrl: './gig-search.component.html',
  styleUrls: ['./gig-search.component.scss']
})
export class GigSearchComponent implements OnInit {

  gigs$: Observable<GigResource[]>;

  private searchTerms = new Subject<string>();

  constructor(private gigService: GigService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.gigs$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.gigService.searchGigs(term))
    );
  }
}
