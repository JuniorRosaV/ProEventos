import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterModule,
            RouterOutlet,
            // Contatos,
            // Dashboards,
            // Eventos,
            // Palestrantes,
            // Perfil,
            // Titulo,
            Nav,
          ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
  protected readonly title = signal('ProEventos-app');
}
