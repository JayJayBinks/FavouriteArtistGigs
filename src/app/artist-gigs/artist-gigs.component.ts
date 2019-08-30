import { Component, OnInit } from '@angular/core';
import { isNotNullOrUndefined } from '../../../node_modules/codelyzer/util/isNotNullOrUndefined';
import { ArtistService } from '../artist.service';
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
              private artistService: ArtistService) { }

  ngOnInit() {
    this.getGigs();
  }

  getGigs(): void {
    this.artistService.getTopArtists()
      .subscribe(artistsResource => {
          const artists = artistsResource.topartists.artist;
          artists.forEach(artist => this.gigService.getGigs(artist.name)
            .subscribe(gigs => {
              if (isNotNullOrUndefined(gigs.events)) {
                gigs.events.event.forEach(gig => this.gigs.push(gig));
              }
            }))
          ;
        }
      );
  }
}
