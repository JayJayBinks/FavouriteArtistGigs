import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
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


  sortByDate = (a: GigResource, b: GigResource) => {
    if (isNullOrUndefined(a.start_time)) {
      return 1;
    }
    if (isNullOrUndefined(b.start_time)) {
      return -1;
    }
    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
  };

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
                gigs.events.event
                  .sort((a, b) => this.sortByDate(a, b))
                  .forEach(gig => this.gigs.push(gig));
              }
            }))
          ;
        }
      );
  }
}
