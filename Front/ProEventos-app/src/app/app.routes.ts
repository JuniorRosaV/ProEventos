import { Routes } from '@angular/router';
import { Contatos } from './components/contatos/contatos';
import { Dashboards } from './components/dashboards/dashboards';
import { Eventos } from './components/eventos/eventos';
import { Palestrantes } from './components/palestrantes/palestrantes';
import { Perfil } from './components/perfil/perfil';
import { EventoDetalhe } from './components/eventos/evento-detalhe/evento-detalhe';
import { EventoListagem } from './components/eventos/evento-listagem/evento-listagem';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
    { path: 'contatos', component: Contatos },
    { path: 'dashboards', component: Dashboards },
    {
        path: 'eventos', component: Eventos,
        children: [
            { path: 'eventos', redirectTo: 'eventos/lista', pathMatch: 'full' },
            { path: 'detalhe/:id', component: EventoDetalhe },
            { path: 'detalhe', component: EventoDetalhe },
            { path: 'lista', component: EventoListagem },
        ]
    },
    { path: 'palestrantes', component: Palestrantes },
    { path: 'perfil', component: Perfil },
    { path: '**', redirectTo: 'dashboards', pathMatch: 'full' }
];
