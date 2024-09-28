import { Component, OnInit, inject } from '@angular/core';
import { SupportService } from '../../services/support.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SupportTicket } from '../../models/supportTicket.model';
import { Category } from '../../models/category.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NavBarAdminComponent } from '../../shared/components/nav-bar-admin/nav-bar-admin.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-pool',
  standalone: true,
  imports: [TranslateModule, NavBarAdminComponent],
  templateUrl: './admin-pool.component.html',
  styleUrl: './admin-pool.component.css',
})
export class AdminPoolComponent implements OnInit {
  translate: TranslateService = inject(TranslateService);
  categories: Category[] = [];
  tickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];
  errorMessage: string | null = null;
  categoryMap: { [key: string]: { name: string } } = {};
  selectedCategory: string | null = null;
  selectedClosure: string | null = null;
  selectedResolution: string | null = null;
  ticketSubscription: Subscription | undefined;

  constructor(public SupportService: SupportService, public adminService: AdminService) {}
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

    this.SupportService.getAllTickets().subscribe({
      next: (res: SupportTicket[]) => {
        this.tickets = res;
        this.filteredTickets = [...this.tickets];
      },
      error: (err) => {
        if (err.error.error) {
          this.triggerError(err.error.error);
        } else if (err.error.msg) {
          this.triggerError(err.error.msg);
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }

  onFilterCategory(category: string) {}

  onFilterClosure(closure: string) {}

  onFilterResolution(resolution: string) {}

  private applyFilters() {}

  resetFilters() {}

  refreshTickets() {}

  triggerError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
    });
  }

  assignTicket(ticketId: string) {
    this.adminService.assignTicket(ticketId).subscribe({
      next: (res) => {
        if (res.success) {
          this.triggerSuccess();
          this.refreshTickets();
        } else {
          this.triggerFailure('FAILURE_TICKET_ASSIGN_ALERT_TEXT');
        }
      },
      error: (err) => {
        if (err.error.assigned) {
          this.triggerFailure('FAILURE_TICKET_ASSIGNED');
          this.refreshTickets();
        } else {
          this.triggerFailure('FAILURE_TICKET_ASSIGN_ALERT_TEXT');
        }
      },
    });
  }

  triggerSuccess() {
    const translatedTitle = this.translate.instant('SUCCESS_LOGIN_ALERT_TITLE');
    const translatedText = this.translate.instant(
      'SUCCESS_TICKET_ASSIGN_ALERT_TEXT'
    );
    Swal.fire({
      icon: 'success',
      title: translatedTitle,
      text: translatedText,
    });
  }

  triggerFailure(toTranslateText: string) {
    const translatedTitle = this.translate.instant('FAILURE_LOGIN_ALERT_TITLE');
    const translatedText = this.translate.instant(toTranslateText);
    Swal.fire({
      icon: 'error',
      title: translatedTitle,
      text: translatedText,
    });
  }

  
}
