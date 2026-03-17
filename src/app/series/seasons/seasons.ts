import { Component, Input } from '@angular/core';
import { Season } from '../../models/series-season';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seasons',
  imports: [],
  templateUrl: './seasons.html',
  styleUrl: './seasons.css',
})
export class Seasons {

  @Input() season!: Season;
  @Input() seriesId!: string;

  DEFAULT_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
  FALLBACK_POSTER = '/no-poster.png';
  posterUrl = '';

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.season?.poster_path) {
      this.posterUrl = this.DEFAULT_POSTER_URL + this.season.poster_path;
    } else {
      this.posterUrl = this.FALLBACK_POSTER;
    }

  }
  
  openDetail() {
    this.router.navigate([`/series/${this.seriesId}/${this.season.season_number}/`]);
  }


  useFallback() {
    this.posterUrl = this.FALLBACK_POSTER;
  }

}
