import { Component, OnInit } from '@angular/core';
import { Gig } from '../gig';
import { GIGS } from '../mock-gigs';

@Component({
  selector: 'app-artist-gigs',
  templateUrl: './artist-gigs.component.html',
  styleUrls: ['./artist-gigs.component.scss']
})
export class ArtistGigsComponent implements OnInit {

  gigs = GIGS;
  selectedGig: Gig;

  constructor() { }

  ngOnInit() {
  }

  onSelect(gig: Gig): void {
    this.selectedGig = gig;
  }
}
