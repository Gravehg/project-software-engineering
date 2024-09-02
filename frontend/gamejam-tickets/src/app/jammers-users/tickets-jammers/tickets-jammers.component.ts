import { Component } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';  // Importar RouterModule

@Component({
  selector: 'app-tickets-jammers',
  standalone: true,
  imports: [NavBarJammerComponent,RouterModule],
  templateUrl: './tickets-jammers.component.html',
  styleUrl: './tickets-jammers.component.css',
})
export class TicketsJammersComponent {
  ticketID:string = '66d32687c984de6e19593b9f';
  constructor(public router: Router) { }

  


}
