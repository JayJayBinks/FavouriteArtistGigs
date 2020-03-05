import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ArtistServiceFacade } from './artist-service/artist.service.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dateFormat = 'h:mm a MMM d';
  title = 'FavouriteArtistGigs';


  constructor(private artistService: ArtistServiceFacade, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.route.snapshot.fragment;
        // TODO this is a dirty hack
        const token = fragment ? fragment.replace('access_token=', '') : '';
        this.artistService.login(token);
      }
    });
  }
}
