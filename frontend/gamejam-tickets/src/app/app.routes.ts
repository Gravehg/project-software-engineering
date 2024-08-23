import { Routes } from '@angular/router';
import { TicketsJammersComponent } from './jammers-users/tickets-jammers/tickets-jammers.component'; // Import the JammersUsersComponent class

export const routes: Routes = [
    {
        path: '', // Este es el default, cambiar al login cuando esté listo
        loadChildren: () => import('./jammers-users/jammers-users.routes').then(m => m.JAMMERS_USERS) //Aquí se importa el módulo de login
    },
    {
        path: 'jammers-users',
        loadChildren: () => import('./jammers-users/jammers-users.routes').then(m => m.JAMMERS_USERS)
    },
];
