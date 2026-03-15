import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor() { }

  seriesPoster = '/series.webp';
  moviesPoster = '/movies.webp';

  ngOnInit() {
    console.log('home component initialized');
  }
}
