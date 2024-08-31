import { Component, inject, OnInit } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category.model';
import { SupportTicket } from '../../models/supportTicket.model';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-tickets-jammers',
  standalone: true,
  imports: [NavBarJammerComponent, CardComponent, TranslateModule, CommonModule],
  templateUrl: './tickets-jammers.component.html',
  styleUrl: './tickets-jammers.component.css',
})
export class TicketsJammersComponent {
  translate: TranslateService = inject(TranslateService);
  constructor(public UserService: UserService) {}
  categories: Category[] = [];
  errorMessage: string | null = null;
  selectedCategory: string | null = null;
  filteredTickets: SupportTicket[] = [];
  tickets: SupportTicket[] = [];
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;
  ngOnInit(): void {
    this.UserService.getCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories';
        console.error('Error fetching categories:', err);
      },
    });

    // this.UserService.getUserCategories().subscribe({
    //   next: (res: SupportTicket[]) => {
    //     this.tickets = res;
    //     this.filteredTickets = [...this.tickets];
    //   },
    //   error: (err) => {
    //     (this.errorMessage = 'Failed to get tickets, try again!'),
    //       console.log('Error fetching tickets', err);
    //   },
    // });

  }
  selectedCategoryId: string | null = null;
  toggleSelection(categoryId: string): void {
    this.selectedCategoryId = this.selectedCategoryId === categoryId ? null : categoryId;
  }
  isChecked(categoryId: string): boolean {
    return this.selectedCategoryId === categoryId;
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