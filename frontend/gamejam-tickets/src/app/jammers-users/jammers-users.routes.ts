import { Routes } from '@angular/router';
import { TicketsJammersComponent } from './tickets-jammers/tickets-jammers.component';

export const JAMMERS_USERS: Routes = [
    { path: 'tickets-jammers', component: TicketsJammersComponent },
    { path: '', component: TicketsJammersComponent }, //Esot hay que quitarlo, es solo para pruebas
];