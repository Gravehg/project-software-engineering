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

  constructor(private http: HttpClient) {
    this.initializeTicketRefresh();
  }

  private initializeTicketRefresh() {
    console.log('Iniciando refresco de tickets');
    timer(0, this.refreshInterval).pipe(
      tap(() => console.log('Timer triggered, fetching tickets...')),
      switchMap(() => this.fetchSupportPoolTickets()),
      tap(tickets => {
        console.log(`Tickets obtenidos del servidor: ${tickets.length}`);
        this.ticketsSubject.next(tickets);
      }),
      catchError(error => {
        console.error('Error al obtener tickets:', error);
        return [];
      }),
      shareReplay(1)
    ).subscribe();
  }

  private fetchSupportPoolTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.supportApiUrl}get-pool-tickets`).pipe(
      retry(2), // Reintenta hasta 2 veces en caso de error
      catchError(error => {
        console.error('Error al obtener tickets:', error);

        // Analiza el tipo de error según el código de estado HTTP
        if (error.status === 404) {
            console.error('Endpoint no encontrado (404). Verifica la URL.');
        } else if (error.status === 500) {
            console.error('Error en el servidor (500). Revisa los logs del servidor.');
        } else if (error.status === 401) {
            console.error('No autorizado (401). Verifica tus credenciales o sesión.');
        } else if (error.status === 0) {
            console.error('Error de red o CORS. El servidor no está respondiendo.');
        } else {
            console.error(`Error desconocido: ${error.message}`);
        }

        // Devuelve un Observable vacío para no interrumpir el flujo
        return [];
    }),
    shareReplay(1) // Comparte el último valor obtenido con nuevos suscriptores
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
    return this.ticketsSubject.asObservable();
  }
}
