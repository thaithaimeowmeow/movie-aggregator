import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {

  id: string | null = null;
  pageType: string = '';
  videoUrl: SafeResourceUrl = '';

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.pageType = this.route.snapshot.data['pageType'];
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (!this.id) return;

    const url = this.pageType === 'movies'
      ? `https://vidsrc.to/embed/movie/${this.id}`
      : `https://vidsrc.to/embed/tv/${this.id}/1/1`;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}