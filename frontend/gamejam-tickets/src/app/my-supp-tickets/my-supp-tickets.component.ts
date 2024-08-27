import { Component } from '@angular/core';
import { NavBarSupportComponent } from '../shared/components/nav-bar-support/nav-bar-support.component';

@Component({
  selector: 'app-my-supp-tickets',
  standalone: true,
  imports: [NavBarSupportComponent],
  templateUrl: './my-supp-tickets.component.html',
  styleUrl: './my-supp-tickets.component.css',
})
export class MySuppTicketsComponent {}
