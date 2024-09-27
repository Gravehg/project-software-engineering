import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/userModel';
import { Category } from '../models/category.model';
import { SupportTicket } from '../models/supportTicket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  baseApiUrl: string = environment.apiUrl;
  categoryApiUrl: string = this.baseApiUrl + '/category/';
  adminApiUrl: string = this.baseApiUrl + '/admin/';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.adminApiUrl}get-users`);
  }

  getUserWithTickets(
    id: string
  ): Observable<{ user: UserModel; tickets: SupportTicket[] }> {
    return this.http.post<{ user: UserModel; tickets: SupportTicket[] }>(
      `${this.adminApiUrl}get-user-and-tickets`,
      {
        findUserId: id,
      }
    );
  }
}
