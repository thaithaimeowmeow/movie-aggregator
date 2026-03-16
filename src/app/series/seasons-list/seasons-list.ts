import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { map, Observable, shareReplay, startWith } from 'rxjs';
import { Season } from '../../models/series-season';
import { CommonModule } from '@angular/common';
import { Seasons } from '../seasons/seasons';


@Component({
  selector: 'app-seasons-list',
  imports: [CommonModule,Seasons],
  templateUrl: './seasons-list.html',
  styleUrl: './seasons-list.css',
})

export class SeasonsList {

  id: string = '';
  seasons$: Observable<Season[]> | undefined;
  skeletonArray = Array(5);

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    const id = route.snapshot.paramMap.get('id');
    this.id = id || '';

    if (!id) return;

    this.seasons$ = this.movieService.getSeriesDetails(id).pipe(
      map((res: any) => {
        return res.seasons;
      }),
      shareReplay(1)
    );
  }
  ngOnInit(){}
}