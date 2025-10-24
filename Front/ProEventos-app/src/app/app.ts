import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { EventoListagem } from './components/eventos/evento-listagem/evento-listagem';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterModule,
            RouterOutlet,
            Nav,
          ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
  protected readonly title = signal('ProEventos-app');
}
