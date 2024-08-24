import { Component } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';
import { TicketBoxComponent } from '../../shared/components/ticket-box/ticket-box.component';


@Component({
  selector: 'app-ticket-creation',
  standalone: true,
  imports: [NavBarJammerComponent, TicketBoxComponent],
  templateUrl: './ticket-creation.component.html',
  styleUrl: './ticket-creation.component.css'
})
export class TicketCreationComponent {

}
