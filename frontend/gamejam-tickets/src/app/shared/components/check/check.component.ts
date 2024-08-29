import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { SupportService } from '../../../services/support.service';
import { Category } from '../../../models/category.model';
@Component({
  selector: 'app-check',
  standalone: true,
  imports: [CommonModule], // Añadir CommonModule aquí
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})

export class CheckComponent implements OnInit{
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
  selectedCategoryId: string | null = null;
  toggleSelection(categoryId: string): void {
    this.selectedCategoryId = this.selectedCategoryId === categoryId ? null : categoryId;
  }
  isChecked(categoryId: string): boolean {
    return this.selectedCategoryId === categoryId;
  }
}



