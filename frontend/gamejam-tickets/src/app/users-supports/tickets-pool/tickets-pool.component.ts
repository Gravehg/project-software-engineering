import { Component, OnInit } from '@angular/core';
import { NavBarSupportComponent } from '../../shared/components/nav-bar-support/nav-bar-support.component';
import { TranslateModule } from '@ngx-translate/core';
import { SupportService } from '../../services/support.service';
import { Category } from '../../models/category.model';
import { SupportTicket } from '../../models/supportTicket.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-tickets-pool',
  standalone: true,
  imports: [TranslateModule, NavBarSupportComponent, NgStyle],
  templateUrl: './tickets-pool.component.html',
  styleUrl: './tickets-pool.component.css',
})
export class TicketsPoolComponent {
  categories: Category[] = [];
  tickets: SupportTicket[] = [];
  errorMessage: string | null = null;
  categoryMap: { [key: string]: { name: string; color: string } } = {};

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
        this.errorMessage = 'Failed to load categories';
        console.error('Error fetching categories:', err);
      },
    });

    this.SupportService.getSupportPoolTickets().subscribe({
      next: (res: SupportTicket[]) => {
        this.tickets = res;
      },
      error: (err) => {
        (this.errorMessage = 'Failed to get tickets, try again!'),
          console.log('Error fetching tickets', err);
      },
    });
  }

  getCategoryColor(categoryId: string): string {
    return this.categoryMap[categoryId]?.color || '#ffffff'; // Default to white if color not found
  }
}
