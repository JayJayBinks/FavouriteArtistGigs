import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dateFormat = 'h:mm a MMM d';
  title = 'FavouriteArtistGigs';
}
