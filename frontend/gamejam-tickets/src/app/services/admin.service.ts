import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { UsertTicket } from '../models/userTicket.model';
import { suppUser } from '../models/suppUser.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseApiUrl: string = environment.apiUrl;
  adminApiUrl: string = this.baseApiUrl + '/admin/';

  constructor(private http: HttpClient) {}

  getExistingUsers(email: String): Observable<any> {
    return this.http.get<any>(`${this.adminApiUrl}get-existing-users/${email}`);
  }

  getExistingSupports(email: String): Observable<any> {
    return this.http.get<any>(
      `${this.adminApiUrl}get-existing-supports/${email}`
    );
  }

  postUserSupport(info: any): Observable<any> {
    return this.http.post<any>(
      `${this.adminApiUrl}create-new-user-support`,
      info
    );
  }

  postIncresAUserToSupport(info: any): Observable<any> {
    return this.http.post<any>(
      `${this.adminApiUrl}create-new-support-with-user`,
      info
    );
  }
}
