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

@Component({
  selector: 'app-my-supp-tickets',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  errorMessage: string | null = null;
  categoryMap: { [key: string]: { name: string } } = {};
  selectedCategory: string | null = null;
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;


  dateChange(event: MatDatepickerInputEvent<any>) {
    // Aquí puedes acceder a event.value para obtener la fecha seleccionada
    const selectedDate = event.value;
    console.log('Fecha seleccionada:', selectedDate);
  }
  
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

  triggerError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
    });
  }
}
