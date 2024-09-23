import { Component } from '@angular/core';
import { NavBarAdminComponent } from '../../shared/components/nav-bar-admin/nav-bar-admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-supports',
  standalone: true,
  imports: [NavBarAdminComponent, TranslateModule, CommonModule],
  templateUrl: './create-supports.component.html',
  styleUrl: './create-supports.component.css'
})
export class CreateSupportsComponent {
  isUser: boolean = false;
  email: string = '';
  name: string = '';

  constructor(public adminService: AdminService) {}

  submitSupport(form: any) {
    if (this.isUser) {
      console.log('Creating user support');
    } else {
      console.log('Creating support support');
    }
  }

  submitExistingUser() {
    if (this.adminService.getExistingUsers(this.email)) {
      if (this.adminService.getExistingSupports(this.email)) {
        console.log("Se crea el soporte") //Se crea el soporte
      } else {
        console.log("Se avisa que ya existe el soporte") //Se avisa que ya existe el soporte
      }
    } else {
      console.log("Se avisa que no existe el usuario") //Se avisa que no existe el usuario
    }
  }

  submitNewUser() {
    if (!this.adminService.getExistingUsers(this.email)) {
      console.log("Se crea el usuario") //Se crea el usuario
    } else {
      console.log("Se avisa que ya existe el usuario") //Se avisa que ya existe el usuario
    }
  }

}
