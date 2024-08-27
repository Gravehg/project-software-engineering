import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-support',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './nav-bar-support.component.html',
  styleUrl: './nav-bar-support.component.css',
})
export class NavBarSupportComponent {
  translate: TranslateService = inject(TranslateService);

  onLanguageChange(lang: string): void {
    this.translate.use(lang);
  }

  signOut() {}
}
