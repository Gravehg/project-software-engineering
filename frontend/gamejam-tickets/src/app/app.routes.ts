import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatSuppComponent } from './users-supports/chat-supp/chat-supp.component';
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
    path: 'tickets-pool',
    loadChildren: () =>
      import('./users-supports/tickets-pool/tickets-pool.routes').then(
        (m) => m.TICKETSPOOL
      ),
  },
  {
    path: 'ticket-chat/:id',  
    component: ChatSuppComponent,
  },
  {
    path: '**',
    loadChildren: () => import('./login/login.routes').then((m) => m.LOGIN), //Aquí se importa el módulo de
  },
];
