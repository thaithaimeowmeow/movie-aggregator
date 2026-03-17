import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeModels } from '../../models/episode';

@Component({
  selector: 'app-episode',
  imports: [],
  templateUrl: './episode.html',
  styleUrl: './episode.css',
})

export class Episode {

  @Input() episode!: EpisodeModels;
  @Input() pageType: string = 'series';
  @Input() seriesId: string | null = null;


  DEFAULT_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
  FALLBACK_POSTER = '/no-poster.png';
  posterUrl = '';

  constructor(private router: Router) { }

  openDetail() {
    console.log("detail", this.episode.id);
    console.log("pageType", this.pageType);
    console.log("episode", this.episode);
    let seasonNum = this.episode.season_number;
    console.log("seasonNum", this.episode.season_number);
    console.log("seriesId", this.seriesId);

    this.router.navigate([`/series/${this.seriesId}/${seasonNum}/${this.episode.episode_number}`]);
  }


  ngOnInit() {

    if (this.episode?.still_path) {
      this.posterUrl = this.DEFAULT_POSTER_URL + this.episode.still_path;
    } else {
      this.posterUrl = this.FALLBACK_POSTER;
    }


  }

  useFallback() {
    this.posterUrl = this.FALLBACK_POSTER;
  }

}
