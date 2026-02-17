import { Routes } from '@angular/router';
import { Contatos } from './components/contatos/contatos';
import { Dashboards } from './components/dashboards/dashboards';
import { Eventos } from './components/eventos/eventos';
import { Palestrantes } from './components/palestrantes/palestrantes';
import { Perfil } from './components/perfil/perfil';
import { EventoDetalhe } from './components/eventos/evento-detalhe/evento-detalhe';
import { EventoListagem } from './components/eventos/evento-listagem/evento-listagem';
import { User } from './components/user/user';
import { Registration } from './components/user/registration/registration';
import { Login } from './components/user/login/login';
import { EventoCarregar } from './components/eventos/evento-carregar/evento-carregar';

export const routes: Routes = [
    {
        path: 'user', component: User,
        children: 
        [
            { path: 'login', component: Login },
            { path: 'registration', component: Registration }
        ]
        
    }, 
    { path: 'perfil', component: Perfil },
    { path: '', redirectTo: '/user/login', pathMatch: 'full' },
    { path: 'contatos', component: Contatos },
    { path: 'dashboards', component: Dashboards },
    {
        path: 'eventos', component: Eventos,
        children: [
            { path: '', redirectTo: 'lista', pathMatch: 'full' },
            { path: 'detalhe/:id', component: EventoCarregar },
            { path: 'detalhe', component: EventoDetalhe },
            { path: 'lista', component: EventoListagem },
        ]
    },
    { path: 'palestrantes', component: Palestrantes },
    // { path: '**', redirectTo: 'dashboards', pathMatch: 'full' }
];
