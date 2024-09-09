import { Component, OnInit } from '@angular/core';
import { NavBarSupportComponent } from '../../shared/components/nav-bar-support/nav-bar-support.component';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';
import { Category } from '../../models/category.model';
import { ChatService } from '../../services/chatService/chat.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { SuppChatTicket } from '../../models/suppChatTicket.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-supp',
  standalone: true,
  imports: [
    NavBarSupportComponent,
    CommonModule,
    FormsModule,
    ConfirmationModalComponent,
    TranslateModule,
  ],
  templateUrl: './chat-supp.component.html',
  styleUrl: './chat-supp.component.css',
})
export class ChatSuppComponent implements OnInit {
  constructor(
    private router: Router,
    public chatService: ChatService,
    public route: ActivatedRoute
  ) {}

  messages: Message[] = [];
  categories: Category[] = [];
  categoriaSeleccionada = '';
  ticket: SuppChatTicket | undefined;
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
    this.initializeData();
  }

  initializeData() {
    if (this.ticketID) {
      this.chatService
        .getSuppTicketById(this.ticketID)
        .pipe(
          switchMap((response) => {
            this.ticket = response.ticket;

            if (this.ticket && this.ticket._id) {
              this.closureState = this.ticket.closureState;
              this.resolutionState = this.ticket.resolutionState;

              if (this.ticket.idUserIssued) {
                this.jammer = this.ticket.idUserIssued;
                this.jammerName = this.ticket.userName;
              }

              if (this.ticket.idSupport) {
                this.support = this.ticket.idSupport;
                this.supportName = this.ticket.supportName;
              }

              return this.chatService.getChatID(this.ticket._id);
            } else {
              throw new Error('Ticket ID is missing');
            }
          }),

          tap((chatIDData) => (this.chatID = chatIDData.chatID)),

          switchMap(() => {
            if (this.ticket && this.ticket.idCategory) {
              return this.chatService.getCategoriesLessone(
                this.ticket.idCategory
              );
            } else {
              throw new Error('Category ID is missing');
            }
          }),
          tap((categoriesData) => (this.categories = categoriesData)),

          switchMap(() => {
            if (this.chatID) {
              return this.chatService.getMessages(this.chatID);
            } else {
              throw new Error('Chat ID is missing');
            }
          })
        )
        .subscribe({
          next: (messagesData) => {
            this.messages = messagesData;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error initializing data:', err);
            this.isLoading = false;
          },
        });
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

  loadCategories(categoryID: string): void {
    this.chatService.getCategoriesLessone(categoryID).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        this.errorMessage = 'failed to load categories';
        console.error('Error fetching categories:', this.errorMessage);
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
    this.chatService.getSuppTicketById(ticketID).subscribe({
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

  updateCategory(categorySelected: string) {
    if (this.ticketID) {
      this.chatService
        .updateCategory(this.ticketID, categorySelected)
        .subscribe(
          (response) => {
            console.log('Categoria actualizado', response);
          },
          (error) => {
            console.error('Error al actualizar la Categoria', error);
          }
        );
    } else {
      console.error('ID del ticket no proporcionado');
    }
  }

  handleTransfer(): void {
    if (this.categoriaSeleccionada !== '') {
      this.updateAssignedSupp();
      this.updateCategory(this.categoriaSeleccionada);
      this.handleTransferNotifications();
    }
  }

  handleTransferNotifications(): void {
    Swal.fire({
      title: 'Transfer has been completed',
      text: 'You will be unsigned from this ticket.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/supp-tickets']);
      } else if (
        result.dismiss === Swal.DismissReason.backdrop ||
        result.dismiss === Swal.DismissReason.esc
      ) {
        this.router.navigate(['/supp-tickets']);
      }
    });
  }
}
