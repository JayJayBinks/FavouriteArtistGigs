import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { TopArtist } from '../topArtistsResource';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  artists: TopArtist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.getTopArtists();
  }

  getRank(artist: TopArtist): number {
    return ArtistService.getRank(artist);
  }

  getTopArtists(): void {
    this.artistService.getTopArtists()
      .subscribe(artistsResource => {
          this.artists = artistsResource.topartists.artist;
        }
      );
  }
}
