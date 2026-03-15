import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../services/movie-service';
import { Observable } from 'rxjs';
import { map,startWith } from 'rxjs/operators';




@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})

export class MovieList implements OnInit {


  loading = true;

  movies$: Observable<Movie[]> | undefined;

  skeletonArray = Array(14);

  constructor(private movieService: MovieService) {

    this.movies$ = this.movieService.getPopularMovies(1).pipe(
      map((res: any) => res.results),
      startWith([])
    );
  }

  ngOnInit() {
    
  }


}

