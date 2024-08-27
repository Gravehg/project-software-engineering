import { Component } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';

@Component({
  selector: 'app-tickets-jammers',
  standalone: true,
  imports: [NavBarJammerComponent],
  templateUrl: './tickets-jammers.component.html',
  styleUrl: './tickets-jammers.component.css',
})
export class TicketsJammersComponent {}
