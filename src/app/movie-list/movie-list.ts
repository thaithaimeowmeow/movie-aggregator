import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../services/movie-service';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  private destroyRef = inject(DestroyRef);

  constructor(private movieService: MovieService, private route: ActivatedRoute, private searchService: SearchService) {

    this.pageType = this.route.snapshot.data['pageType']; // 'movies' or 'series'

    // console.log(this.pageType);


  }

  doSearch(query: string) {

    this.movies$ = this.movieService.search(this.pageType, query, 1).pipe(
      map((res: any) => res.results),
      startWith([]),
      shareReplay(1)
    );

  }

  ngOnInit() {

    if (this.pageType === 'movies') {
      this.movies$ = this.movieService.getTrending(1, 'movie').pipe(
        map((res: any) => res.results),
        startWith([]),
        shareReplay(1)
      );
    } else if (this.pageType === 'series') {
      this.movies$ = this.movieService.getTrending(1, 'tv').pipe(
        map((res: any) => res.results),
        startWith([]),
        shareReplay(1)
      );
    }


    this.searchService.search$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(query => {

      console.log('search query:', query, Math.random());
      this.doSearch(query)

    });

  }

}

