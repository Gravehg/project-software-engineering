import { Routes } from '@angular/router';
import { TicketsJammersComponent } from './tickets-jammers/tickets-jammers.component';
import { TicketCreationComponent } from './ticket-creation/ticket-creation.component';

export const JAMMERS_USERS: Routes = [
    { path: 'tickets-jammers', component: TicketsJammersComponent },
    { path: 'tickets-creation', component: TicketCreationComponent },
    { path: '', component: TicketsJammersComponent }, //Esot hay que quitarlo, es solo para pruebas
];