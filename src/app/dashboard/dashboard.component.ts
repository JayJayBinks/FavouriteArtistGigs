import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { ArtistServiceFacade } from '../artist-service/artist.service.facade';
import { GigService } from '../gig.service';
import { GigResource } from '../gigsResource';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentInit {
  gigs: GigResource[] = [];
  @ViewChild('grid', {static: false})
  grid: MatGridList;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 2
  };


  constructor(private gigService: GigService,
              private artistService: ArtistServiceFacade,
              private observableMedia: MediaObserver) { }


  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
    });
  }


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
