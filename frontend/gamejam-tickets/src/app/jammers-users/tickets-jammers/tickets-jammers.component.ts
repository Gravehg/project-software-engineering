import { Component, inject, OnInit } from '@angular/core';
import { NavBarJammerComponent } from '../../shared/components/nav-bar-jammer/nav-bar-jammer.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category.model';
import { UsertTicket } from '../../models/userTicket.model';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-tickets-jammers',
  standalone: true,
  imports: [NavBarJammerComponent, CardComponent, TranslateModule, CommonModule],
  templateUrl: './tickets-jammers.component.html',
  styleUrl: './tickets-jammers.component.css',
})
export class TicketsJammersComponent {
  constructor(public UserService: UserService) {}
  translate: TranslateService = inject(TranslateService);

  categories: Category[] = [];
  errorMessage: string | null = null;
  selectedCategory: string | null = null;
  filteredTickets: UsertTicket[] = [];
  tickets: UsertTicket[] = [];
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

    this.UserService.getJammerTickets().subscribe({
      next: (res: UsertTicket[]) => {
        this.tickets = res;
        this.filteredTickets = [...this.tickets];
        console.log('Tickets: ', this.tickets);
      },
      error: (err) => {
        (this.errorMessage = 'Failed to get tickets, try again!'),
          console.log('Error fetching tickets', err);
      },
    });

  }

  onFilterCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    console.log('Selected category:', this.selectedCategory);
    this.applyFilters();
  }

  onFilterClosure(closureState: string) {
    this.selectedClosure = closureState;
    this.applyFilters();
  }

  onFilterResolution(resolutionState: string) {
    this.selectedResolution = resolutionState;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredTickets = this.tickets.filter((ticket) => {
      const matchesCategory = !this.selectedCategory || ticket.category === this.selectedCategory;
      const matchesClosure = !this.selectedClosure || ticket.closureState === this.selectedClosure;
      const matchesResolution = !this.selectedResolution || ticket.resolutionState === this.selectedResolution;

      return matchesCategory && matchesClosure && matchesResolution;
    });
  }

  resetFilters() {
    this.selectedCategory = null;
    this.selectedClosure = null;
    this.selectedResolution = null;
    this.filteredTickets = [...this.tickets]; // Reset to all tickets
  }
}
