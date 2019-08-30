import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistGigsComponent } from './artist-gigs/artist-gigs.component';
import { ArtistService } from './artist.service';
import { DateFormatPipe } from './DateTimePipe';
import { GigDetailComponent } from './gig-detail/gig-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
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
    DateFormatPipe
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
export class AppModule { }
