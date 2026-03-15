import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard implements OnInit {

  DEFAULT_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
  FALLBACK_POSTER = '/no-poster.png';
  posterUrl = '';

  @Input() movie!: Movie;



  constructor() { }


  ngOnInit() {

    if (this.movie?.poster_path) {
      this.posterUrl = this.DEFAULT_POSTER_URL + this.movie.poster_path;
    } else {
      this.posterUrl = this.FALLBACK_POSTER;
    }

  }

  useFallback() {
    this.posterUrl = this.FALLBACK_POSTER;
  }




}
