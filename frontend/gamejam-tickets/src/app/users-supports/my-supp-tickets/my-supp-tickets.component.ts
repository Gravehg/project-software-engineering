import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavBarSupportComponent } from '../../shared/components/nav-bar-support/nav-bar-support.component';
import { TranslateModule } from '@ngx-translate/core';
import { SupportService } from '../../services/support.service';
import { Category } from '../../models/category.model';
import { SupportTicket } from '../../models/supportTicket.model';
import { RouterModule } from '@angular/router';
import { NgStyle } from '@angular/common';
import Swal from 'sweetalert2';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, }from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-my-supp-tickets',
  standalone: true,
  providers: [provideNativeDateAdapter(),{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE],
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  DatePipe,],
  imports: [TranslateModule, NavBarSupportComponent, RouterModule, NgStyle, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './my-supp-tickets.component.html',
  styleUrl: './my-supp-tickets.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MySuppTicketsComponent implements OnInit {
  @Output() newMessageEvent = new EventEmitter<string>();
  
  constructor(public SupportService: SupportService) {}
  categories: Category[] = [];
  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  filteredDateTickets: SupportTicket[] = [];//cambio de tim
  errorMessage: string | null = null;
  categoryMap: { [key: string]: { name: string } } = {};
  selectedCategory: string | null = null;
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;
  
  ngOnInit(): void {
    this.SupportService.getSupportCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
        this.categoryMap = this.categories.reduce((map, category) => {
          map[category._id] = { name: category.name };
          return map;
        }, {} as { [key: string]: { name: string } });
      },
      error: (err) => {
        if (err.error.error) {
          this.triggerError(err.error.error);
        } else if (err.error.msg) {
          this.triggerError(err.error.msg);
        }
      },
    });

    this.SupportService.getSupportTickets().subscribe({
      next: (res: SupportTicket[]) => {
        this.tickets = res;
        this.filteredTickets = [...this.tickets];
      },
      error: (err) => {
        if (err.error.error) {
          this.triggerError(err.error.error);
        } else if (err.error.msg) {
          this.triggerError(err.error.msg);
        }
      },
    });
  }

  onFilterCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onFilterClosure(closure: string) {
    this.selectedClosure = closure;
    this.applyFilters();
  }

  onFilterResolution(resolution: string) {
    this.selectedResolution = resolution;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredTickets = this.tickets.filter((ticket) => {
      return (
        (!this.selectedCategory || ticket.category === this.selectedCategory) &&
        (!this.selectedClosure ||
          ticket.closureState === this.selectedClosure) &&
        (!this.selectedResolution ||
          ticket.resolutionState === this.selectedResolution)
      );
    });
  }

  resetFilters() {
    this.selectedCategory = null;
    this.selectedClosure = null;
    this.selectedResolution = null;
    this.filteredTickets = [...this.tickets]; // Reset to all tickets
  }

    //Función encargada de casterar las fechas 
    formatDateToDDMMYYYY(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');  // Extrae el día con dos dígitos
      const month = String(date.getMonth() + 1).padStart(2, '0');  // Extrae el mes (sumamos 1 porque los meses comienzan en 0)
      const year = date.getFullYear();  // Extrae el año completo
    
      return `${day}/${month}/${year}`;  // Retorna el formato dd/mm/yyyy
    }

  dateChange(event: MatDatepickerInputEvent<any> ) {
    const selectedDate = this.normalizeDate(event.value); // Normaliza la fecha seleccionada
    console.log('Fecha seleccionada (normalizada): ', selectedDate);
  
    // Filtra los tickets por la fecha seleccionada
    this.filteredTickets = this.tickets.filter((ticket) => {
      const ticketDate = this.normalizeDate(new Date(this.cambiarFormatoFecha(ticket.creationDate))); // Normaliza la fecha del ticket
      console.log('Fecha del ticket (no normalizada): ', ticket.creationDate);//ticketDate);
      
      // Compara las fechas normalizadas
      const isAfterOrEqual = selectedDate <= ticketDate ;
      console.log('Comparación: ', selectedDate, '<=', ticketDate, '=>', isAfterOrEqual);
      
      return isAfterOrEqual;
    });
  }
  
  // Método para normalizar fechas eliminando horas, minutos y segundos
  normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0); // Elimina las horas para comparar solo las fechas
    return normalizedDate;
  }
  //Metodo encargado de acomodar la fechas
  cambiarFormatoFecha(fecha: string) {
    // Dividimos la cadena de fecha por "/"
    let partes = fecha.split('/');
    
    // partes[0] es el día, partes[1] es el mes, partes[2] es el año
    let dia = partes[0];
    let mes = partes[1];
    let año = partes[2];
    
    // Devolvemos la fecha en formato mm/dd/yyyy
    return `${mes}/${dia}/${año}`;
}


  triggerError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
    });
  }
}
