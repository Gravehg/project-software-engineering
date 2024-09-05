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
  ticketApiUrl: string = this.baseApiUrl + '/ticket/';
  
  constructor(private http: HttpClient) {}

  getMessages(chatID: string): Observable<any> { 
    return this.http.get(`${this.chatApiUrl}getMessages`, {
      params: { chatID } 
    });
  }

  getChatID(ticketID: string): Observable<any> {
    return this.http.get(`${this.chatApiUrl}getChatID`, {
      params: { ticketID } 
    });
  } 

  sendMessage(message: Message): Observable<any> {
    return this.http.post(`${this.messageApiUrl}sendMessage`, message);
  }

  getTicketById(ticketID: string): Observable<any> {
    return this.http.get(`${this.ticketApiUrl}getTicketById`, {
      params: { ticketID } 
    });
  } 

  updateClosureState(ticketID: string, newClosureState: string): Observable<any> {
    return this.http.put<any>(`${this.ticketApiUrl}updateClosureState`, { ticketID, newClosureState });
  }

  updateResolutionState(ticketID: string, newResolutionState: string): Observable<any> {
    return this.http.put<any>(`${this.ticketApiUrl}updateResolutionState`, { ticketID, newResolutionState });
  }

  updateAssignedSupp(ticketID: string,): Observable<any> {
    return this.http.put<any>(`${this.ticketApiUrl}updateAssignedSupp`, { ticketID });
  }



}
