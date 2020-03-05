import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DateFormatPipe } from './DateTimePipe';
import { ArtistGigsComponent } from './favourite-artist-gigs/artist-gigs.component';
import { GigDetailComponent } from './gig-detail/gig-detail.component';
import { GigSearchComponent } from './gig-search/gig-search.component';
import { MessagesComponent } from './messages/messages.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { TruncatePipe } from './TruncatePipe';

@NgModule({
  declarations: [
    AppComponent,
    ArtistGigsComponent,
    GigDetailComponent,
    MessagesComponent,
    DashboardComponent,
    TopArtistsComponent,
    ArtistDetailComponent,
    TruncatePipe,
    DateFormatPipe,
    GigSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
