import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  @Input() AppName?: string
  pageType?: string;
  canSearch?: boolean;

  private location = inject(Location);

  searchQuery = '';


  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.route.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
      this.pageType = currentRoute.snapshot.data['pageType'];
      let test = currentRoute.snapshot.data['canSearch'];
      console.log(test,'test')
      this.canSearch = Boolean(currentRoute.snapshot.data['canSearch']);
      console.log(this.pageType, this.canSearch, 'test');
    });
  }




  ngOnInit() { }

  goBack() {
    const url = this.router.url;
    const segments = url.split('/').filter(Boolean);

    if (segments.length <= 1) {

      // on /movies or /series → go home
      this.router.navigate(['/']);

    } else {
      // remove last segment
      segments.pop();
      this.router.navigate(['/' + segments.join('/')]);
    }
  }

  onSearch() {
    if (!this.searchQuery.trim()) return;
    this.searchService.search(this.searchQuery);
  }

}