import { Component, OnInit } from '@angular/core';
import { NavBarSupportComponent } from '../../shared/components/nav-bar-support/nav-bar-support.component';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';
import { ChatService } from '../../services/chatService/chat.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { JammerTicket } from '../../models/jammerTicket.model';

@Component({
  selector: 'app-chat-supp',
  standalone: true,
  imports: [
    NavBarSupportComponent,
    CommonModule,
    FormsModule,
    ConfirmationModalComponent,
  ],
  templateUrl: './chat-supp.component.html',
  styleUrl: './chat-supp.component.css',
})
export class ChatSuppComponent implements OnInit {
  constructor(public chatService: ChatService, public route: ActivatedRoute) {}

  messages: Message[] = [];
  ticket: JammerTicket | undefined;
  errorMessage: string | null = null;
  newMessage = '';
  closureState: string | null = null;
  resolutionState = '';
  jammer = '';
  support = '';
  jammerName = '';
  supportName = '';
  chatID = '';
  ticketID: string | null = null;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.ticketID = this.route.snapshot.paramMap.get('id');
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
          this.resolutionState = this.ticket.resolutionState;
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
      remitent: 'Support',
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
    return remitent === 'Jammer' ? 'align-items-start' : 'align-items-end';
  }

  //Color de mensajes
  getBubbleClasses(remitent: string): string {
    return remitent === 'Jammer'
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

  //Actualizar tickets
  updateTicketState(closureState: string) {
    if (this.ticketID) {
      this.chatService
        .updateClosureState(this.ticketID, closureState)
        .subscribe(
          (response) => {
            console.log('Estado actualizado exitosamente', response);
            this.closureState = closureState;
          },
          (error) => {
            console.error('Error al actualizar el estado', error);
          }
        );
    } else {
      console.error('ID del ticket o nuevo estado no proporcionados');
    }
  }

  updateTicketResolution(resolutionState: string) {
    if (this.ticketID) {
      this.chatService
        .updateResolutionState(this.ticketID, resolutionState)
        .subscribe(
          (response) => {
            console.log('Resolution actualizado exitosamente', response);
            this.resolutionState = resolutionState;
          },
          (error) => {
            console.error('Error al actualizar el estado', error);
          }
        );
    } else {
      console.error('ID del ticket o nuevo estado no proporcionados');
    }
  }

  handleMessage(): void {
    if (this.newMessage !== '') {
      this.sendMessage();
      this.handleUpdates();
    }
  }

  handleUpdates() {
    const estadoCheckbox = document.getElementById(
      'estadoCheckbox'
    ) as HTMLInputElement | null;
    const resolucionCheckbox = document.getElementById(
      'resolucionCheckbox'
    ) as HTMLInputElement | null;

    if (estadoCheckbox && resolucionCheckbox) {
      if (this.closureState === 'Closed') {
        if (estadoCheckbox.checked) {
        } else {
          this.updateTicketState('Open');
        }
        if (
          resolucionCheckbox.checked &&
          this.resolutionState === 'Not resolved'
        ) {
          this.updateTicketResolution('Resolved');
        } else if (!resolucionCheckbox.checked) {
          this.updateTicketResolution('Not resolved');
        }
      } else {
        if (estadoCheckbox.checked) {
          this.updateTicketState('Closed');
        }
        console.log('etra');
        if (
          resolucionCheckbox.checked &&
          this.resolutionState === 'Not resolved'
        ) {
          this.updateTicketResolution('Resolved');
        } else if (!resolucionCheckbox.checked) {
          this.updateTicketResolution('Not resolved');
        }
      }
    }
  }
}
