import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-media-player',
  imports: [],
  templateUrl: './media-player.html',
  styleUrl: './media-player.css',
})
export class MediaPlayer {
  @Input() videoUrl: SafeResourceUrl = '';


  constructor() { }
  
  ngOnInit(){ }



}
