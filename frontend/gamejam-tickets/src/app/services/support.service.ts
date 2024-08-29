import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  baseApiUrl: string = environment.apiUrl;
  categoryApiUrl: string = this.baseApiUrl + '/category/';
  supportApiUrl: string = this.baseApiUrl + '/support/';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryApiUrl}get-categories`);
  }

  getSupportCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.supportApiUrl}get-support-categories`
    );
  }

  getSupportTickets(): void {}
}
