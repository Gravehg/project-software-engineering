import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.css',
})
export class NavBarAdminComponent {
  translate: TranslateService = inject(TranslateService);

  constructor(private userService: UserService, private router: Router) {}

  onLanguageChange(lang: string): void {
    this.translate.use(lang);
  }

  signOut() {
    this.userService.logout().subscribe({
      next: (res) => {
        this.router.navigate(['']);
      },
      error: (err) => {
        this.router.navigate(['']);
      },
    });
  }
}
