import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistModel } from '../artist-service/artist.model';
import { ArtistServiceFacade } from '../artist-service/artist.service.facade';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('slider', { static: false }) slider: ElementRef;
  @ViewChild('parallax', { static: false }) parallax: ElementRef;
  @ViewChild('materialboxed', { static: false }) materialboxed: ElementRef;

  artist: ArtistModel;

  constructor(@Inject('M') private M: any,
              private route: ActivatedRoute,
              private artistService: ArtistServiceFacade,
              private location: Location) { }

  ngOnInit() {
    this.getArtist();
  }

  ngAfterViewInit(): void {
    // tslint:disable:no-unused-expression
    // new M.Slider(this.slider.nativeElement, {});
     new this.M.Parallax(this.parallax.nativeElement, {});
    // new M.Materialbox(this.materialboxed.nativeElement, {});
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
