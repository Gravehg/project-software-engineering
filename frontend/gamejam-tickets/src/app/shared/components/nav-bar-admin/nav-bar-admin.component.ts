import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.css',
})
export class NavBarAdminComponent {
  translate: TranslateService = inject(TranslateService);

  onLanguageChange(lang: string): void {
    this.translate.use(lang);
  }

  signOut() {}
}
