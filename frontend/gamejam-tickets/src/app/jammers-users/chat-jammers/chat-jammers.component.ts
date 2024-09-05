import { Component, OnInit } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';
import { ChatService } from '../../services/chatService/chat.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { JammerTicket } from '../../models/jammerTicket.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-jammers',
  standalone: true,
  imports: [
    NavBarJammerComponent,
    CommonModule,
    FormsModule,
    ConfirmationModalComponent,
  ],
  templateUrl: './chat-jammers.component.html',
  styleUrl: './chat-jammers.component.css',
})
export class ChatJammersComponent implements OnInit {
  constructor(private router: Router,public chatService: ChatService, public route: ActivatedRoute) {}

  // Cosas del modal.
  modalTitle: string = 'Confirmation';
  modalMessage: string =
    'The ticket currently has a status of Closed so sending a message again would put it in "Open" and you will have to wait for a new supp to get assigned, do you want to send the message?';
  modalElement = document.getElementById('confirmationModal');
  modal: any;

  messages: Message[] = [];
  ticket: JammerTicket | undefined;
  errorMessage: string | null = null;
  newMessage = '';
  closureState: string | null = null;
  jammer = '';
  support = '';
  jammerName = '';
  supportName = '';
  chatID = '';
  ticketID: string | null = null;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.ticketID = this.route.snapshot.paramMap.get('ticketID');
    this.loadModal();
    if (this.ticketID) {
      this.getTicket(this.ticketID);
      this.chatService
        .getChatID(this.ticketID)
        .pipe(
          switchMap((data: any) => {
            this.chatID = data.chatID;
            return this.chatService.getMessages(this.chatID);
          })
        )
        .subscribe({
          next: (messagesData) => {
            this.messages = messagesData;
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Failed to load chat and messages';
            this.isLoading = false;
            console.error('Error loading chat and messages:', error);
          },
        });
    } else {
      console.error('No ticketID provided in route.');
    }
  }

  loadMessages(chatID: string): void {
    this.chatService.getMessages(chatID).subscribe({
      next: (data) => {
        this.messages = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'failed to load messages';
        console.error('Error fetching messages:', this.errorMessage);
      },
    });
  }

  getChatID(ticketID: string): void {
    this.chatService.getChatID(ticketID).subscribe({
      next: (data) => {
        this.chatID = data.chatID;
      },
      error: (error) => {
        this.errorMessage = 'Failed to get chat id';
        console.error('Error fetching messages:', error);
      },
    });
  }

  getTicket(ticketID: string): void {
    this.chatService.getTicketById(ticketID).subscribe({
      next: (data) => {
        this.ticket = data.ticket;
        if (this.ticket) {
          this.closureState = this.ticket?.closureState;
          if (this.ticket.idUserIssued) {
            this.jammer = this.ticket.idUserIssued;
            this.jammerName = this.ticket.userName;
          }
          if (this.ticket.idSupport) {
            this.support = this.ticket.idSupport;
            this.supportName = this.ticket.supportName;
          }
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to get chat id';
        console.error('Error fetching messages:', error);
      },
    });
  }

  sendMessage(): void {
    const userMessage = {
      idChat: this.chatID,
      idUser: this.jammer,
      idSupport: this.support,
      text: this.newMessage,
      textDate: new Date(),
      remitent: 'Jammer',
    };
    this.chatService.sendMessage(userMessage).subscribe({
      next: (response) => {
        if (response.success) {
          this.messages.push(response.message);
          this.newMessage = '';
        } else {
          console.error('Error sending message:', response.msg);
        }
      },
      error: (error) => {
        console.error('Error sending message:', error);
      },
    });
  }

  //Circulo y estado del ticket
  getCircleClass(): string {
    switch (this.closureState) {
      case 'Open':
        return 'bg-success';
      case 'Closed':
        return 'bg-danger';
      case 'ReOpen':
        return 'bg-reopen';
      default:
        return '';
    }
  }

  getStatusClass(): string {
    switch (this.closureState) {
      case 'Open':
        return 'text-success';
      case 'Closed':
        return 'text-danger';
      case 'ReOpen':
        return 'text-orange';
      default:
        return '';
    }
  }

  //Alineamiento del mensaje
  getMessageAlignment(remitent: string): string {
    return remitent === 'Support' ? 'align-items-start' : 'align-items-end';
  }

  //Color de mensajes
  getBubbleClasses(remitent: string): string {
    return remitent === 'Support'
      ? 'bg-orange text-white'
      : 'bg-blue text-white';
  }

  //Nombre del remitente
  getSenderName(remitent: string): string {
    switch (remitent) {
      case 'Support':
        return this.supportName;
      case 'Jammer':
        return this.jammerName;
      default:
        return 'Unknown';
    }
  }

  //Actualizar ticket
  updateTicketState() {
    if (this.ticketID) {
      this.chatService.updateClosureState(this.ticketID, 'Open').subscribe(
        (response) => {
          console.log('Estado actualizado exitosamente', response);
        },
        (error) => {
          console.error('Error al actualizar el estado', error);
        }
      );
    } else {
      console.error('ID del ticket o nuevo estado no proporcionados');
    }
  }

  updateAssignedSupp() {
    if (this.ticketID) {
      this.chatService.updateAssignedSupp(this.ticketID).subscribe(
        (response) => {
          console.log('Supp actualizado', response);
        },
        (error) => {
          console.error('Error al actualizar el supp', error);
        }
      );
    } else {
      console.error('ID del ticket no proporcionado');
    }
  }

  //Funciones para modal.

  loadModal(): void {
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      this.modal = new (window as any).bootstrap.Modal(modalElement);
    }
  }

  handleConfirmation(): void {
    this.sendMessage();
    this.updateTicketState();
    this.updateAssignedSupp();
    this.closureState = 'Open';
    this.modal.hide();
    this.router.navigate(['/jammers-users/tickets-jammers']);
    
  }

  handleMessage(): void {
    if (this.newMessage !== '') {
      if (this.closureState !== 'Closed') {
        this.sendMessage();
      } else {
        this.modal.show();
      }
    }
  }
}
