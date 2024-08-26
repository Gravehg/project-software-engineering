import { Component } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-tickets-jammers',
  standalone: true,
  imports: [NavBarJammerComponent, CardComponent],
  templateUrl: './tickets-jammers.component.html',
  styleUrl: './tickets-jammers.component.css'
})
export class TicketsJammersComponent {

}
