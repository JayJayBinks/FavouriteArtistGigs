import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistModel } from '../artist-service/artist.model';
import { ArtistServiceFacade } from '../artist-service/artist.service.facade';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  artist: ArtistModel;

  constructor(private route: ActivatedRoute,
              private artistService: ArtistServiceFacade,
              private location: Location) { }

  ngOnInit() {
    this.getArtist();
  }

  getRank(artist: ArtistModel): number {
    return this.artistService.getRank(this.artist);
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
