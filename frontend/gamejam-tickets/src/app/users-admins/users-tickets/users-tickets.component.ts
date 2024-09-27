import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '../../models/category.model';
import { SupportTicket } from '../../models/supportTicket.model';
import { SupportService } from '../../services/support.service';
import { GlobalService } from '../../services/global.service';
import { NavBarAdminComponent } from '../../shared/components/nav-bar-admin/nav-bar-admin.component';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/userModel';

@Component({
  selector: 'app-users-tickets',
  standalone: true,
  imports: [TranslateModule, RouterModule, NavBarAdminComponent],
  templateUrl: './users-tickets.component.html',
  styleUrl: './users-tickets.component.css',
})
export class UsersTicketsComponent implements OnInit {
  @Input() id: string = '';

  constructor(
    public SupportService: SupportService,
    public GlobalService: GlobalService
  ) {}

  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  categories: Category[] = [];
  errorMessage: string | null = null;
  categoryMap: { [key: string]: { name: string } } = {};
  selectedCategory: string | null = null;
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;
  user: UserModel = {
    _id: '1',
    name: 'Null',
    email: 'null',
    creationDate: 'null',
    role: 'null',
  };

  ngOnInit(): void {
    this.SupportService.getCategories().subscribe({
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

    this.GlobalService.getUserWithTickets(this.id).subscribe({
      next: (res: { user: UserModel; tickets: SupportTicket[] }) => {
        // Assign the user and tickets to the component properties
        this.user = res.user;
        this.tickets = res.tickets;
        this.filteredTickets = [...this.tickets];
      },
      error: (err) => {
        console.error('Error fetching user and tickets:', err);
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
