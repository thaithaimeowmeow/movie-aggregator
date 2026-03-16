import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MediaPlayer } from '../../components/media-player/media-player';

@Component({
  selector: 'app-movie-details',
  imports: [MediaPlayer],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {

  id: string | null = null;
  pageType: string = '';
  videoUrl: SafeResourceUrl = '';

  showPlayer = false;

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router) {
    this.pageType = this.route.snapshot.data['pageType'];
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (!this.id) return;

    console.log(this.pageType, this.id);


    if (!this.id) return;

    const url = this.pageType === 'movies'
      ? `https://vidfast.pro/movie/${this.id}`
      : `https://vidfast.pro/tv/${this.id}/1/1`;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}