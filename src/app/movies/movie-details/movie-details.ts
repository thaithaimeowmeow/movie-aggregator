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
  seasonNum: string | null = null;
  episode: string | null = null;
  pageType: string = '';
  videoUrl: SafeResourceUrl = '';

  showPlayer = false;

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router) {

    this.pageType = this.route.snapshot.data['pageType'];
    this.id = this.route.snapshot.paramMap.get('id');
    this.seasonNum = this.route.snapshot.paramMap.get('seasonNum')
    this.episode = this.route.snapshot.paramMap.get('episode')

  }

  ngOnInit() {
    if (!this.id) return;

    console.log(this.pageType, this.id);


    console.log(this.seasonNum)
    console.log(this.episode)

    if (!this.id) return;



    const url = this.pageType === 'movies'
      ? `https://vidfast.pro/movie/${this.id}`
      : `https://vidfast.pro/tv/${this.id}/${this.seasonNum}/${this.episode}`;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}