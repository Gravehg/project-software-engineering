import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, timer, of } from 'rxjs';
import { switchMap, shareReplay, tap, catchError, retry } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { SupportTicket } from '../models/supportTicket.model';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  baseApiUrl: string = environment.apiUrl;
  private refreshInterval = 3000; // Refrescar cada 30 segundos
  categoryApiUrl: string = this.baseApiUrl + '/category/';
  supportApiUrl: string = this.baseApiUrl + '/support/';
  private ticketsSubject = new BehaviorSubject<SupportTicket[]>([]);

  constructor(private http: HttpClient) {}

  refreshTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(
      `${this.categoryApiUrl}get-pool-tickets`
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryApiUrl}get-categories`);
  }

  getSupportCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.supportApiUrl}get-support-categories`
    );
  }

  getSupportTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(
      `${this.supportApiUrl}get-assigned-tickets`
    );
  }

  getSupportPoolTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(
      `${this.supportApiUrl}get-pool-tickets`
    );
  }

  assignTicket(ticketId: string): Observable<any> {
    return this.http.post(`${this.supportApiUrl}assign-ticket`, { ticketId });
  }

  getAllTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(
      `${this.supportApiUrl}get-all-tickets`
    );
  }
}
