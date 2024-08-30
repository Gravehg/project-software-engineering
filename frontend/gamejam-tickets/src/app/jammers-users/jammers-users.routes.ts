import { Routes } from '@angular/router';
import { TicketsJammersComponent } from './tickets-jammers/tickets-jammers.component';
import { ChatJammersComponent } from './chat-jammers/chat-jammers.component';

export const JAMMERS_USERS: Routes = [
    { path: 'tickets-jammers', component: TicketsJammersComponent },
    { path: '', component: TicketsJammersComponent },
    { path: '/chat/:ticketID', component: ChatJammersComponent },
];