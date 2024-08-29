import { Component, inject } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tickets-jammers',
  standalone: true,
  imports: [NavBarJammerComponent, CardComponent, TranslateModule],
  templateUrl: './tickets-jammers.component.html',
  styleUrl: './tickets-jammers.component.css',
})
export class TicketsJammersComponent {
  translate: TranslateService = inject(TranslateService);
}
