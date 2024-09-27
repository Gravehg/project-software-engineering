import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-nav-bar-jammer',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './nav-bar-jammer.component.html',
  styleUrl: './nav-bar-jammer.component.css',
})
export class NavBarJammerComponent {
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
