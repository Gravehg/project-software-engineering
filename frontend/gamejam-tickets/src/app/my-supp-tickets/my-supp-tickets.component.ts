import { Component, OnInit } from '@angular/core';
import { NavBarSupportComponent } from '../shared/components/nav-bar-support/nav-bar-support.component';
import { TranslateModule } from '@ngx-translate/core';
import { SupportService } from '../services/support.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-my-supp-tickets',
  standalone: true,
  imports: [TranslateModule, NavBarSupportComponent],
  templateUrl: './my-supp-tickets.component.html',
  styleUrl: './my-supp-tickets.component.css',
})
export class MySuppTicketsComponent implements OnInit {
  constructor(public SupportService: SupportService) {}
  categories: Category[] = [];
  errorMessage: string | null = null;
  ngOnInit(): void {
    this.SupportService.getCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories';
        console.error('Error fetching categories:', err);
      },
    });
  }
  onFilterCategory(category: String) {}

  onFilterClosure(closure: String) {}

  onFilterResolution(resolution: String) {}

  resetFilters() {}
}
