import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArtistGigsComponent } from './favourite-artist-gigs/artist-gigs.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GigDetailComponent } from './gig-detail/gig-detail.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';


const routes: Routes = [
  {
    path: 'gigs',
    component: ArtistGigsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'gigDetail/:id',
    component: GigDetailComponent
  },
  {
    path: 'artists',
    component: TopArtistsComponent
  }, {
    path: 'artistDetail/:id',
    component: ArtistDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
