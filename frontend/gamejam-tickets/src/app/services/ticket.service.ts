import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ticket } from '../models/ticket.model';
@Injectable({
  providedIn: 'root'
})
export class TicketService {


  baseApiUrl: string = environment.apiUrl;
  ticketApiUrl: string = this.baseApiUrl + '/ticket/';
  
  constructor(private http: HttpClient) {}

  sendTicket(ticket: ticket): Observable<any> {
    return this.http.post(`${this.ticketApiUrl}add-ticket`, ticket);
  }


}
