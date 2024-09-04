import { Component, inject, Input, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UsertTicket } from '../../../models/userTicket.model';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  translate: TranslateService = inject(TranslateService);
  @Input() ticket: UsertTicket = { _id: '', idUserIssued: '', idSupport: '', resolutionState: '', closureState: '', category: '', topic: '', creationDate: '', email: '', date: '' };

  constructor(private userService: UserService, private router: Router) {}

  comprobateTicketSupport(idTicket: string) {
    this.userService.comprobateTicketSupport(idTicket).subscribe({
      next: (response) => {
        // Verifica si el idSupport es null (isSupportNull es true)
        if (response.isSupportNull) {
          // Redirige si idSupport es null
          this.router.navigate(['jammers-users/chat-jammer', idTicket]);
        } else {
          // Si no es null, muestra un mensaje o realiza otra acción
          alert('El ticket ya tiene soporte asignado'); // Cambiar por un modal
        }
      },
      error: (err) => {
        console.error('Error checking ticket:', err);
      },
    });
  }
}
