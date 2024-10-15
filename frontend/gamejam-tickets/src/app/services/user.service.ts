import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { UsertTicket } from '../models/userTicket.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = environment.apiUrl;
  categoryApiUrl: string = this.baseApiUrl + '/category/';
  supportApiUrl: string = this.baseApiUrl + '/user/';
  authApiUrl: string = this.baseApiUrl + '/auth/';

  constructor(private http: HttpClient) {}

  login(email: String): Observable<any> {
    return this.http.post(`${this.authApiUrl}magic-link`, { email });
  }

  isLogged(): Observable<any> {
    return this.http.get(`${this.authApiUrl}is-logged`, {
      observe: 'response',
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryApiUrl}get-categories`);
  }

  getUserCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.supportApiUrl}get-support-categories`
    );
  }

  getJammerTickets(): Observable<UsertTicket[]> {
    return this.http.get<UsertTicket[]>(
      `${this.supportApiUrl}get-jammer-tickets`
    );
  }

  comprobateTicketSupport(idTicket: string): Observable<any> {
    return this.http.get(`${this.supportApiUrl}comprobate-ticket-support/` + idTicket);
  }

  logout(): Observable<any> {
    return this.http.get(`${this.authApiUrl}log-out`);
  }
}
