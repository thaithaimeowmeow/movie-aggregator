import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MovieList } from './movie-list/movie-list';
import { SeasonsList } from './series/seasons-list/seasons-list';
import { MovieDetails } from './movies/movie-details/movie-details';
import { Episode } from './series/episode/episode';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'movies', component: MovieList, data: { pageType: 'movies' } },
  { path: 'movies/:id', component: MovieDetails, data: { pageType: 'movies' } },
  
  { path: 'series', component: MovieList, data: { pageType: 'series' } },
  { path: 'series/:id', component: SeasonsList },
  { path: 'series/:id/:season/:episode', component: MovieDetails, data: { pageType: 'series' } },
  { path: 'series/:id/:season', component: Episode, data: { pageType: 'series' } },
  // { path: '**', redirectTo: '' }
];