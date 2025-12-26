import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CollapseModule, BsDropdownModule, RouterModule, NgIf],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss']
})
export class Nav {
  isCollapsed = true;

  constructor(private router: Router) {}

  showMenu(): boolean {
    return (
      this.router.url !== '/user/login' &&
      this.router.url !== '/user/registration'
    );
  }
}
