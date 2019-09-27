import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';
import { TopArtist } from '../topArtistsResource';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  artist: TopArtist;

  constructor(private route: ActivatedRoute,
              private artistService: ArtistService,
              private location: Location) { }

  ngOnInit() {
    this.getArtist();
  }

  getRank(artist: TopArtist): number {
    return ArtistService.getRank(this.artist);
  }

  getArtist(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.artistService.getArtist(id)
      .subscribe(artist => this.artist = artist);
  }

  goBack(): void {
    this.location.back();
  }

}
