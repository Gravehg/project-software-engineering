import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarAdminComponent } from '../../shared/components/nav-bar-admin/nav-bar-admin.component';
import { RouterModule } from '@angular/router';
import { UserModel } from '../../models/userModel';
import { GlobalService } from '../../services/global.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavBarAdminComponent, RouterModule, TranslateModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  filteredUsers: UserModel[] = [];
  roles: { id: number; role: string }[] = [
    { id: 1, role: 'Support' },
    { id: 2, role: 'User' },
    { id: 3, role: 'Global Organizer' },
  ];
  selectedRole: string | null = null;
  filterName: string | null = null;

  constructor(public GlobalService: GlobalService) {}

  ngOnInit(): void {
    this.GlobalService.getUsers().subscribe({
      next: (res: UserModel[]) => {
        this.users = res;
        this.filteredUsers = res;
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

  onFilterRole(role: string) {
    this.selectedRole = role;
    this.applyFilters();
  }

  onFilterName() {}

  private applyFilters() {
    this.filteredUsers = this.users.filter((user) => {
      return (
        (!this.selectedRole || user.role === this.selectedRole) &&
        (!this.filterName || user.name === this.filterName)
      );
    });
  }

  resetFilters() {
    this.selectedRole = null;
    this.filterName = null;
    this.filteredUsers = [...this.users]; // Reset to all tickets
  }

  triggerError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
    });
  }
}
