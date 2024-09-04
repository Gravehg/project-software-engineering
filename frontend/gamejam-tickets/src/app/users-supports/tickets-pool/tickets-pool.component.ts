import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NavBarSupportComponent } from '../../shared/components/nav-bar-support/nav-bar-support.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SupportService } from '../../services/support.service';
import { Category } from '../../models/category.model';
import { SupportTicket } from '../../models/supportTicket.model';
import { NgStyle } from '@angular/common';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tickets-pool',
  standalone: true,
  imports: [TranslateModule, NavBarSupportComponent, NgStyle],
  templateUrl: './tickets-pool.component.html',
  styleUrl: './tickets-pool.component.css',
})
export class TicketsPoolComponent implements OnInit, OnDestroy {
  translate: TranslateService = inject(TranslateService);
  categories: Category[] = [];
  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  errorMessage: string | null = null;
  categoryMap: { [key: string]: { name: string; color: string } } = {};
  selectedCategory: string | null = null;
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;
  ticketSubscription: Subscription | undefined;

  constructor(public SupportService: SupportService) {}

  ngOnInit(): void {
    this.SupportService.getSupportCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
        this.categoryMap = this.categories.reduce((map, category) => {
          map[category._id] = { name: category.name, color: category.color };
          return map;
        }, {} as { [key: string]: { name: string; color: string } });
      },
      error: (err) => {
        if (err.error.error) {
          this.triggerError(err.error.error);
        } else if (err.error.msg) {
          this.triggerError(err.error.msg);
        }
      },
    });

    this.SupportService.getSupportPoolTickets().subscribe({
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

  ngOnDestroy(): void {
    if (this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
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

  refreshTickets() {
    this.SupportService.getSupportPoolTickets().subscribe({
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

  triggerError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
    });
  }

  getCategoryColor(categoryId: string): string {
    return this.categoryMap[categoryId]?.color || '#ffffff'; // Default to white if color not found
  }

  assignTicket(ticketId: string) {
    this.SupportService.assignTicket(ticketId).subscribe({
      next: (res) => {
        if (res.success) {
          this.triggerSuccess();
          this.refreshTickets();
        } else {
          this.triggerFailure('FAILURE_TICKET_ASSIGN_ALERT_TEXT');
        }
      },
      error: (err) => {
        if (err.error.assigned) {
          this.triggerFailure('FAILURE_TICKET_ASSIGNED');
          this.refreshTickets();
        } else {
          this.triggerFailure('FAILURE_TICKET_ASSIGN_ALERT_TEXT');
        }
      },
    });
  }

  triggerSuccess() {
    const translatedTitle = this.translate.instant('SUCCESS_LOGIN_ALERT_TITLE');
    const translatedText = this.translate.instant(
      'SUCCESS_TICKET_ASSIGN_ALERT_TEXT'
    );
    Swal.fire({
      icon: 'success',
      title: translatedTitle,
      text: translatedText,
    });
  }

  triggerFailure(toTranslateText: string) {
    const translatedTitle = this.translate.instant('FAILURE_LOGIN_ALERT_TITLE');
    const translatedText = this.translate.instant(toTranslateText);
    Swal.fire({
      icon: 'error',
      title: translatedTitle,
      text: translatedText,
    });
  }
}
