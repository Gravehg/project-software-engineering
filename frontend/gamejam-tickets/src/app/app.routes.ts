import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatSuppComponent } from './users-supports/chat-supp/chat-supp.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { NotLogedInComponent } from './error-pages/not-loged-in/not-loged-in.component';

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
    canActivate: [authGuardGuard],
  },
  {
    path: 'supp-tickets',
    loadChildren: () =>
      import('./users-supports/my-supp-tickets/my-supp-tickets.routes').then(
        (m) => m.SUPPORTTICKETS
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'admin-users',
    loadChildren: () =>
      import('./users-admins/admin-users.routes').then((m) => m.ADMINS_USERS),
  },
  {
    path: 'tickets-pool',
    loadChildren: () =>
      import('./users-supports/tickets-pool/tickets-pool.routes').then(
        (m) => m.TICKETSPOOL
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'ticket-chat/:id',
    component: ChatSuppComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'not-loged-in',
    component: NotLogedInComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
