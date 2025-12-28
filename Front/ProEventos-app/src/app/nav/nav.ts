import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    FormsModule,
    BsDropdownModule
  ],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss']
})
export class Nav {

  searchValue = '';
  showProfile = false;
  showMenu = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showMenu = !this.router.url.startsWith('/user');
      });
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
  }

  logout(): void {
    this.router.navigate(['/user/login']);
  }
}
