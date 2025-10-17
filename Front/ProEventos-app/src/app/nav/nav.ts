import { Component } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  imports: [CollapseModule, BsDropdownModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
  isCollapsed = true;
}
