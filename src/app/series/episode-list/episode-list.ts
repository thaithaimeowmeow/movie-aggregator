import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeModels } from '../../models/episode';
import { map, Observable, shareReplay } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Episode } from '../episode/episode';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-episode-list',
  imports: [Episode, AsyncPipe],
  templateUrl: './episode-list.html',
  styleUrl: './episode-list.css',
})
export class EpisodeList {

  seriesId: string | null = null;
  seasonNum: string | null = null;

  episodes$: Observable<EpisodeModels[]> | undefined;
  skeletonArray = Array(5);

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.seriesId = this.route.snapshot.paramMap.get('id');
    this.seasonNum = this.route.snapshot.paramMap.get('seasonNum');

  }

  ngOnInit() {
    console.log('Series ID:', this.seriesId);
    console.log('Season Number:', this.seasonNum);

    this.episodes$ = this.movieService.getSeasonDetails(this.seriesId, this.seasonNum).pipe(
      map((res: any) => {
        return res.episodes;
      }),
      shareReplay(1)
    );


  }

}
