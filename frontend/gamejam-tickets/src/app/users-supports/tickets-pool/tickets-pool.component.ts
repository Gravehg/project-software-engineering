import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBarSupportComponent } from '../../shared/components/nav-bar-support/nav-bar-support.component';
import { TranslateModule } from '@ngx-translate/core';
import { SupportService } from '../../services/support.service';
import { Category } from '../../models/category.model';
import { SupportTicket } from '../../models/supportTicket.model';
import { NgStyle } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tickets-pool',
  standalone: true,
  imports: [TranslateModule, NavBarSupportComponent, NgStyle],
  templateUrl: './tickets-pool.component.html',
  styleUrl: './tickets-pool.component.css',
})
export class TicketsPoolComponent implements OnInit, OnDestroy {
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
    console.log('TicketsPoolComponent initialized');
    this.loadCategories();
  }

  ngOnDestroy(): void {
    console.log('TicketsPoolComponent destroyed');
    if (this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }

  private loadCategories(): void {
    this.SupportService.getSupportCategories().subscribe({
      next: (res: Category[]) => {
        console.log(`Categories loaded: ${res.length}`);
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
        (!this.selectedClosure || ticket.closureState === this.selectedClosure) &&
        (!this.selectedResolution || ticket.resolutionState === this.selectedResolution)
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
    console.log("Refresh tickets");
    this.SupportService.refreshTickets();
  }

  getCategoryColor(categoryId: string): string {
    return this.categoryMap[categoryId]?.color || '#ffffff'; // Default to white if color not found
  }
}