import { Component, OnInit } from '@angular/core';
import { NavBarAdminComponent } from '../../shared/components/nav-bar-admin/nav-bar-admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdminService } from '../../services/admin.service';
import { Category } from '../../models/category.model';
import { SupportTicket } from '../../models/supportTicket.model';
import { RouterModule } from '@angular/router';
import { NgStyle } from '@angular/common';
import { SupportService } from '../../services/support.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [TranslateModule, NavBarAdminComponent, RouterModule, NgStyle],
  templateUrl: './admin-tickets.component.html',
  styleUrl: './admin-tickets.component.css',
})
export class AdminTicketsComponent implements OnInit {
  constructor(public SupportService: SupportService) {}
  categories: Category[] = [];
  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  errorMessage: string | null = null;
  categoryMap: { [key: string]: { name: string } } = {};
  selectedCategory: string | null = null;
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;

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
        this.errorMessage = 'Failed to load categories';
        console.error('Error fetching categories:', err);
        console.error('Error response body:', err.error);
      },
    });
  }

  onFilterCategory(category: string) {}

  onFilterClosure(closure: string) {}

  onFilterResolution(resolution: string) {}

  private applyFilters() {}

  resetFilters() {}

  triggerError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
    });
  }
}
