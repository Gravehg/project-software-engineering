import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = environment.apiUrl;
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
}
