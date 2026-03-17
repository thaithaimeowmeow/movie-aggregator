import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // protected readonly title = signal('movie-aggregator');
  AppName: string = 'movie-aggregator'

}