import { RouterModule, Routes } from '@angular/router';
import { TicketsJammersComponent } from './tickets-jammers/tickets-jammers.component';
import { TicketCreationComponent } from './ticket-creation/ticket-creation.component';
import { ChatJammersComponent } from './chat-jammers/chat-jammers.component';

export const JAMMERS_USERS: Routes = [
  { path: 'tickets-jammers', component: TicketsJammersComponent },
  { path: 'tickets-creation', component: TicketCreationComponent },
  {
    path: 'tickets-jammers/chat-jammer/:ticketID',
    component: ChatJammersComponent,
  },
  {
    path: 'chat-jammer/:ticketID',
    component: ChatJammersComponent,
  },
  { path: '', component: TicketsJammersComponent }, //Esot hay que quitarlo, es solo para pruebas
];

export const AppRoutingModule = RouterModule.forRoot(JAMMERS_USERS);
