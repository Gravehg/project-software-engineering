import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})

export class ChatService {
  baseApiUrl: string = environment.apiUrl;
  chatApiUrl: string = this.baseApiUrl + '/chat/';
  messageApiUrl: string = this.baseApiUrl + '/message/';
  
  constructor(private http: HttpClient) {}

  getMessages(chatID: String): Observable<any> {
    return this.http.post(`${this.chatApiUrl}getMessages`, { chatID });
  }

  getChatID(ticketID: String): Observable<any> {
    return this.http.post(`${this.chatApiUrl}getMessages`, { ticketID });
  }

  sendMessage(message: any): Observable<any> {
    return this.http.post(`${this.messageApiUrl}sendMessage`, message);
  }

 

  
}
