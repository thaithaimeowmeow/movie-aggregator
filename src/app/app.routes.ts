import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MovieList } from './movie-list/movie-list';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'movies', component: MovieList },
];
