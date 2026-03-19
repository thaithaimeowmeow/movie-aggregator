import { Component, DestroyRef, inject, OnInit, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../services/movie-service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCard, InfiniteScrollDirective],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit, AfterViewInit {

  pageType: string = '';
  movies: Movie[] = [];
  skeletonArray = Array(20);
  currentPage = 1;
  loading = false;
  searchQuery = '';

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {
    this.pageType = this.route.snapshot.data['pageType'];
  }

  ngOnInit() {
    this.searchService.search$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(query => {
      this.searchQuery = query;
      this.movies = [];
      this.currentPage = 1;
      this.loadPage(1);
    });
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    this.loadPage(1);
    this.cdr.detectChanges();
  }

  loadPage(page: number) {
    console.log('loadPage called, loading:', this.loading);
    if (this.loading) return;
    this.loading = true;

    const request$ = this.searchQuery
      ? this.movieService.search(this.pageType, this.searchQuery, page)
      : this.pageType === 'movies'
        ? this.movieService.getTrending(page, 'movie')
        : this.movieService.getTrending(page, 'tv');

    request$.pipe(
      map((res: any) => res.results)
    ).subscribe({
      next: (results: Movie[]) => {
        console.log('results:', results.length);
        this.ngZone.run(() => {
          this.movies = [...this.movies, ...results];
          console.log('movies:', this.movies.length);
          this.currentPage = page;
          this.loading = false;
          this.cdr.markForCheck();
        });
      },
      error: (err) => {
        console.log('error:', err);
        this.loading = false;
      }
    });
  }

  onScrolled() {
    this.loadPage(this.currentPage + 1);
  }

  ngOnDestroy() {
    console.log('MovieList destroyed');
  }
}