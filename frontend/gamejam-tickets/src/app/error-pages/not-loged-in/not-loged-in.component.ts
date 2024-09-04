import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-not-loged-in',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './not-loged-in.component.html',
  styleUrl: './not-loged-in.component.css',
})
export class NotLogedInComponent {
  translate: TranslateService = inject(TranslateService);
  onLanguageChange(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translateText(selectedLanguage);
  }
  translateText(lang: string) {
    this.translate.use(lang);
  }
}
