import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MovieList } from './movie-list/movie-list';
import { SeasonsList } from './series/seasons-list/seasons-list';
import { MovieDetails } from './movies/movie-details/movie-details';
import { EpisodeList } from './series/episode-list/episode-list';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'movies', component: MovieList, data: { pageType: 'movies', canSearch: true } },
  { path: 'movies/:id', component: MovieDetails, data: { pageType: 'movies', canSearch: false } },

  { path: 'series', component: MovieList, data: { pageType: 'series', canSearch: true } },
  { path: 'series/:id', component: SeasonsList, data: { pageType: 'series', canSearch: false } },
  { path: 'series/:id/:seasonNum', component: EpisodeList, data: { pageType: 'series', canSearch: false } },
  { path: 'series/:id/:seasonNum/:episode', component: MovieDetails, data: { pageType: 'series', canSearch: false } },
  // { path: '**', redirectTo: '' }
];