import { Component, OnInit } from '@angular/core';
import { Gig } from '../gig';
import { GigService } from '../gig.service';

@Component({
  selector: 'app-artist-gigs',
  templateUrl: './artist-gigs.component.html',
  styleUrls: ['./artist-gigs.component.scss']
})
export class ArtistGigsComponent implements OnInit {

  gigs: Gig[];
  selectedGig: Gig;

  constructor(private gigService: GigService) { }

  ngOnInit() {
    this.getGigs();
  }

  onSelect(gig: Gig): void {
    this.selectedGig = gig;
  }

  getGigs(): void {
    this.gigService.getGigs()
      .subscribe(gigs => this.gigs = gigs);
  }
}
