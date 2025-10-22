import { Routes } from '@angular/router';
import { Contatos } from './components/contatos/contatos';
import { Dashboards } from './components/dashboards/dashboards';
import { Eventos } from './components/eventos/eventos';
import { Palestrantes } from './components/palestrantes/palestrantes';
import { Perfil } from './components/perfil/perfil';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
    { path: 'contatos', component: Contatos },
    { path: 'dashboards', component: Dashboards },
    { path: 'eventos', component: Eventos },
    { path: 'palestrantes', component: Palestrantes },
    { path: 'perfil', component: Perfil },
    { path: '**', redirectTo: 'dashboards', pathMatch: 'full' }
];
