import { Component, OnInit } from '@angular/core';
import { NavBarSupportComponent } from '../shared/components/nav-bar-support/nav-bar-support.component';
import { TranslateModule } from '@ngx-translate/core';
import { SupportService } from '../services/support.service';
import { Category } from '../models/category.model';
import { SupportTicket } from '../models/supportTicket.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-supp-tickets',
  standalone: true,
  imports: [TranslateModule, NavBarSupportComponent, RouterModule],
  templateUrl: './my-supp-tickets.component.html',
  styleUrl: './my-supp-tickets.component.css',
})
export class MySuppTicketsComponent implements OnInit {
  constructor(public SupportService: SupportService) {}
  categories: Category[] = [];
  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  errorMessage: string | null = null;
  categoryMap: { [key: string]: string } = {};
  selectedCategory: string | null = null;
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;

  ngOnInit(): void {
    this.SupportService.getSupportCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
        this.categoryMap = this.categories.reduce((map, category) => {
          map[category._id] = category.name;
          return map;
        }, {} as { [key: string]: string });
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories';
        console.error('Error fetching categories:', err);
      },
    });

    this.SupportService.getSupportTickets().subscribe({
      next: (res: SupportTicket[]) => {
        this.tickets = res;
        this.filteredTickets = [...this.tickets];
      },
      error: (err) => {
        (this.errorMessage = 'Failed to get tickets, try again!'),
          console.log('Error fetching tickets', err);
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
}
