import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TicketsJammersComponent } from './jammers-users/tickets-jammers/tickets-jammers.component'; // Import the JammersUsersComponent class

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.routes').then((m) => m.LOGIN), //Aquí se importa el módulo de
  },
  {
    path: 'jammers-users',
    loadChildren: () =>
      import('./jammers-users/jammers-users.routes').then(
        (m) => m.JAMMERS_USERS
      ),
  },
  {
    path: 'supp-tickets',
    loadChildren: () =>
      import('./my-supp-tickets/my-supp-tickets.routes').then(
        (m) => m.SUPPORTTICKETS
      ),
  },
  {
    path: '**',
    loadChildren: () => import('./login/login.routes').then((m) => m.LOGIN), //Aquí se importa el módulo de
  },
];
