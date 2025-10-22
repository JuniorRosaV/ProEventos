import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { Palestrantes } from './components/palestrantes/palestrantes';
import { Contatos } from './components/contatos/contatos';
import { Perfil } from './components/perfil/perfil';
import { Dashboards } from './components/dashboards/dashboards';
import { Titulo } from './shared/titulo/titulo';
import { Eventos } from './components/eventos/eventos';

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
