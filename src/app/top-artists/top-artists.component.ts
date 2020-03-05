import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../artist-service/artist.model';
import { ArtistServiceFacade } from '../artist-service/artist.service.facade';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  artists: ArtistModel[];

  constructor(private artistService: ArtistServiceFacade) { }

  ngOnInit() {
    this.getTopArtists();
  }

  getRank(artist: ArtistModel): number {
    return this.artistService.getRank(artist);
  }

  getTopArtists(): void {
    this.artistService.getTopArtists()
      .subscribe(artistsResource => {
          this.artists = artistsResource.items;
        }
      );
  }
}
