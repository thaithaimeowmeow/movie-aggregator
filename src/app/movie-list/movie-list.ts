import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../services/movie-service';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})

export class MovieList implements OnInit {

  pageType: string = "";

  movies$: Observable<Movie[]> | undefined;

  skeletonArray = Array(20); // Array of 20 empty values for skeleton loading

  constructor(private movieService: MovieService, private route: ActivatedRoute) {

    this.pageType = this.route.snapshot.data['pageType']; // 'movies' or 'series'

    console.log(this.pageType);

    if (this.pageType === 'movies') {
      this.movies$ = this.movieService.getPopularMovies(1).pipe(
        map((res: any) => res.results),
        startWith([]),
        shareReplay(1)
      );
    } else if (this.pageType === 'series') {
      this.movies$ = this.movieService.getPopularSeries(1).pipe(
        map((res: any) => res.results),
        startWith([]),
        shareReplay(1)
      );
    }
    // else
    //   return 404;


  }

  ngOnInit() {

  }

}

