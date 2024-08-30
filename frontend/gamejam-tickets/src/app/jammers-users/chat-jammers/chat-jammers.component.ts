import { Component, OnInit } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';
import { ChatService } from '../../services/chatService/chat.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-tickets-jammers',
  standalone: true,
  imports: [NavBarJammerComponent,CommonModule,FormsModule ],
  templateUrl: './chat-jammers.component.html',
  styleUrl: './chat-jammers.component.css'
})
export class ChatJammersComponent implements OnInit {

  constructor(public chatService: ChatService,public route: ActivatedRoute) {}
  messages: Message[] = []; //traerlo con el idchat
  errorMessage: string | null = null;
  newMessage = '';
  status: string = 'Close'; //cargar del estado del ticket
  jammer = "66d10eaf501c2d584e4773e9"; //cargar del ticket
  support = "66d10ec3501c2d584e4773ea"; //cargar del ticket
  chatID = "66d11f914676edbe811055f0"; // con el ticketid ir a la base y traerlo
  ticketID: string | null = null;
  

  ngOnInit(): void {
    this.ticketID = this.route.snapshot.paramMap.get('ticketID');

    if (this.ticketID) { 
      this.getChatID(this.ticketID);
    } else {
      console.error('No ticketID provided in route.');
    }

    this.loadMessages(this.chatID);
  }

  loadMessages( chatID: String): void {
    this.chatService.getMessages(chatID).subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (error) => {
        this.errorMessage = "failed to load messages"
        console.error('Error fetching messages:', this.errorMessage);
      }
    });
  }

  getChatID( ticketID: String): void {
    this.chatService.getChatID(ticketID).subscribe({
      next: (data) => {
        this.chatID = data;
      },
      error: (error) => {
        this.errorMessage = "failed to load messages"
        console.error('Error fetching messages:', error);
      }
    });
  }

  
  sendMessage(newMessage: string) {
    const userMessage = {
      idChat: "66d11f914676edbe811055f0",
      idUser: "66d10eaf501c2d584e4773e9",
      idSupport: "66d10ec3501c2d584e4773ea",
      text: newMessage,
      textDate: new Date(),
      remitent: "Jammer",
    };
    this.messages.push(userMessage);
    this.newMessage = '';

    //Llamar a reabrir si cerrado
    //LLamar a mandar a base
  }

  sendMessage2(): void {
    if (this.newMessage!=="") {
      const userMessage = {
        idChat: this.chatID,
        idUser: '66d10eaf501c2d584e4773e9',  // Reemplaza con el ID de usuario real
        idSupport: '66d10ec3501c2d584e4773ea', // Reemplaza con el ID de soporte real
        text: this.newMessage,
        remitent: 'Jammer'  // Reemplaza con el remitente real
      };

      this.chatService.sendMessage(userMessage).subscribe({
        next: (response) => {
          if (response.success) {
            this.messages.unshift(response.message); // Añade el mensaje a la lista
            this.newMessage = ''; // Limpia el campo del mensaje
          } else {
            console.error('Error sending message:', response.msg);
          }
        },
        error: (error) => {
          console.error('Error sending message:', error);
        }
      });
    }
  }



}
