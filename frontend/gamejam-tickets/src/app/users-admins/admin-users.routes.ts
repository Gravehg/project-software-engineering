import { RouterModule, Routes } from '@angular/router';
import { CreateSupportsComponent } from './create-supports/create-supports.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { UsersTicketsComponent } from './users-tickets/users-tickets.component';
import { AdminTicketsComponent } from './admin-tickets/admin-tickets.component';
import { AdminPoolComponent } from './admin-pool/admin-pool.component';
import { TicketsBySupportComponent } from './tickets-by-support/tickets-by-support.component';
import { ChatTicketComponent } from './chat-ticket/chat-ticket.component';

export const ADMIN_USERS: Routes = [
  { path: '', component: AdminPoolComponent },
  { path: 'create-support', component: CreateSupportsComponent },
  { path: 'admin-pool', component: AdminPoolComponent },
  { path: 'admin-tickets', component: AdminTicketsComponent },
  { path: 'users-pool', component: UsersComponent },
  { path: 'tickets-by-support', component: TicketsBySupportComponent },
  { path: 'tickets-by-support/chat-ticket/:id', component: ChatTicketComponent },
  {
    path: 'admin-users/admin-user-tickets/:id',
    component: UsersTicketsComponent,
  },
  { path: 'admin-user-tickets/:id', component: UsersTicketsComponent },
];

export const AppRoutingModule = RouterModule.forRoot(ADMIN_USERS);
