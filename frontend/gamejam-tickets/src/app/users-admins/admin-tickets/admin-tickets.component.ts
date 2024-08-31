import { Component, OnInit } from '@angular/core';
import { NavBarSupportComponent } from '../../shared/components/nav-bar-support/nav-bar-support.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdminService } from '../../services/admin.service';
import { Category } from '../../models/category.model';
import { SupportTicket } from '../../models/supportTicket.model';
import { RouterModule } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [TranslateModule, NavBarSupportComponent, RouterModule, NgStyle],
  templateUrl: './admin-tickets.component.html',
  styleUrl: './admin-tickets.component.css',
})
export class AdminTicketsComponent implements OnInit {
  constructor(public AdminService: AdminService) {}
  categories: Category[] = [];
  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  errorMessage: string | null = null;
  categoryMap: { [key: string]: { name: string; color: string } } = {};
  selectedCategory: string | null = null;
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;

  ngOnInit(): void {
    this.AdminService.getAllCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
        this.categoryMap = this.categories.reduce((map, category) => {
          map[category._id] = { name: category.name, color: category.color };
          return map;
        }, {} as { [key: string]: { name: string; color: string } });
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories';
        console.error('Error fetching categories:', err);
      },
    });

    this.AdminService.getAllTickets().subscribe({
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

  getCategoryColor(categoryId: string): string {
    return this.categoryMap[categoryId]?.color || '#ffffff'; // Default to white if color not found
  }
}
