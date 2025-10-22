import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CollapseModule, BsDropdownModule,RouterModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss']
})
export class Nav {
  isCollapsed = true;
}
