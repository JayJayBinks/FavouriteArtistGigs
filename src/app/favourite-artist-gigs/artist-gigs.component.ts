import { Component, OnInit } from '@angular/core';
import { ArtistServiceFacade } from '../artist-service/artist.service.facade';
import { GigService } from '../gig.service';
import { GigResource } from '../gigsResource';

@Component({
  selector: 'app-artist-gigs',
  templateUrl: './artist-gigs.component.html',
  styleUrls: ['./artist-gigs.component.scss']
})
export class ArtistGigsComponent implements OnInit {

  gigs: GigResource[] = [];

  constructor(private gigService: GigService,
              private artistService: ArtistServiceFacade) { }

  ngOnInit() {
    this.getGigs();
  }

  getGigs(): void {
    this.artistService.getTopArtists()
      .subscribe(artistsResource => {
          const artists = artistsResource.items;
          this.gigs = this.gigService.getGigsForArtists(artists.map(a => a.name));
        }
      );
  }
}
