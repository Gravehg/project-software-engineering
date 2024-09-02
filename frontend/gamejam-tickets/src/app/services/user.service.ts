import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { SupportTicket } from '../models/supportTicket.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = environment.apiUrl;
  categoryApiUrl: string = this.baseApiUrl + '/category/';
  supportApiUrl: string = this.baseApiUrl + '/support/';
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

  getJammerTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(
      `${this.supportApiUrl}get-jammer-tickets`
    );
  }
}
