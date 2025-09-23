import { Component } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-nav',
  imports: [CollapseModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
  isCollapsed = true;
}
