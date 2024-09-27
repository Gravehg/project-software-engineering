import { Component, inject, OnInit} from '@angular/core';
import { NavBarAdminComponent } from '../../shared/components/nav-bar-admin/nav-bar-admin.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-supports',
  standalone: true,
  imports: [NavBarAdminComponent, TranslateModule, CommonModule, FormsModule],
  templateUrl: './create-supports.component.html',
  styleUrls: ['./create-supports.component.css']
})
export class CreateSupportsComponent implements OnInit {
  translate: TranslateService = inject(TranslateService);
  isUser: boolean = false;
  showConfirmationModal: boolean = false;
  message: string = '';  // Mensaje dinámico
  categoris: any = [];
  supportDetails: { 
    email: string;
    name: string;
    categoris: { category: string; value: boolean }[];
  } = { 
    email: '',
    name: '',
    categoris: [],
  };

  constructor(public adminService: AdminService, public supService: UserService) {}

  ngOnInit() {
    this.supService.getCategories().subscribe((categories) => {
      this.categoris = categories;
      this.supportDetails.categoris = categories.map((category) => {
        return { category: category._id, value: false };
      });
      console.log("Categories", categories);
    });
  }

  submitSupport(form: any) {
    if (form.valid) {
      if (this.isUser) {
        this.submitExistingUser();
      } else {
        this.submitNewUser();
      }
    }
  }

  submitExistingUser() {
    this.adminService.getExistingUsers(this.supportDetails.email).subscribe(userExists => {
      this.isUser = userExists;
      console.log("UserExists" ,userExists);
      if (userExists.ok) {
        this.adminService.getExistingSupports(this.supportDetails.email).subscribe(supportExists => {
          console.log("SupportExists" ,supportExists);
          if (supportExists.ok) {
            this.openConfirmationModal("SUPPORT_USER_ALREADY_EXISTS", "FAILURE_LOGIN_ALERT_TITLE", false);
          } else {
            this.adminService.postIncresAUserToSupport(this.supportDetails).subscribe(() => {
              this.openConfirmationModal("SUPPORT_USER_CREATED", "SUCCESS_LOGIN_ALERT_TITLE", true);
            });
            // this.openConfirmationModal("SUPPORT_USER_CREATED", "SUCCESS_LOGIN_ALERT_TITLE", true);
          }
        });
      } else {
        this.openConfirmationModal("EMAIL_NOT_FOUND", "FAILURE_LOGIN_ALERT_TITLE", false);
      }
    });
  }

  submitNewUser() {
    this.adminService.getExistingUsers(this.supportDetails.email).subscribe(userExists => {
      if (!userExists.ok) {
        this.adminService.postUserSupport(this.supportDetails).subscribe(() => {
          this.openConfirmationModal("SUPPORT_USER_CREATED", "SUCCESS_LOGIN_ALERT_TITLE", true);
        });
      } else {
        this.openConfirmationModal("EMAIL_ALREADY_EXISTS", "FAILURE_LOGIN_ALERT_TITLE", false);
      }
    });
  }

  openConfirmationModal(message: string, title: string, success: boolean) {
    const translatedTitle = this.translate.instant(title);
    const translatedText = this.translate.instant(message);
    const icon = success ? 'success' : 'error';
    Swal.fire({
      icon: icon,
      title: translatedTitle,
      text: translatedText
    });
  }
  
}
