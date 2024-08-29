import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TicketsJammersComponent } from './jammers-users/tickets-jammers/tickets-jammers.component'; // Import the JammersUsersComponent class
import { authGuardGuard } from './guards/auth-guard.guard';


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
    //canActivate: [authGuardGuard], esto se tiene que descomentar despues
  },
  {
    path: 'supp-tickets',
    loadChildren: () =>
      import('./my-supp-tickets/my-supp-tickets.routes').then(
        (m) => m.SUPPORTTICKETS
      ),
    //canActivate: [authGuardGuard], esto se tiene que descomentar despues
  },
  {
    path: '**',
    loadChildren: () => import('./login/login.routes').then((m) => m.LOGIN), //Aquí se importa el módulo de
  },
];
