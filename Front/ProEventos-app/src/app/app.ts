import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Eventos } from './eventos/eventos';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
             RouterOutlet,
             Eventos,
             Nav,
           ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('ProEventos-app');
}
