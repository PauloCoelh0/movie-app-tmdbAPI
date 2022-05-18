import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { SerieDetailsComponent } from './serie-details/serie-details.component';
import { SeriesComponent } from './series/series.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'home/movies', component: MoviesComponent },
  { path: 'home/series', component: SeriesComponent },
  { path: 'movie-details', component: MovieDetailsComponent},
  { path: 'movie-details/:film', component: MovieDetailsComponent},
  { path: 'serie-details/:tv', component: SerieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
