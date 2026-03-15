import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class MovieService {

  TMDB_URL = "https://api.themoviedb.org/3";

  private headers = {
    Authorization: `Bearer ${environment.tmdbToken}`
  };

  constructor(private http: HttpClient) { }

  getPopularMovies(pages: number = 1) {

    // console.log(this.headers);

    return this.http.get(`${this.TMDB_URL}/movie/popular`, {
      headers: this.headers,
      params: {
        page: pages
      }
    });
  }

  getMovieDetails(movieId: number) {
    return this.http.get(`${this.TMDB_URL}/movie/${movieId}`);
  }




}
