import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-nav-bar-jammer',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './nav-bar-jammer.component.html',
  styleUrl: './nav-bar-jammer.component.css'
})
export class NavBarJammerComponent {

  translate: TranslateService = inject(TranslateService);
  
  onLanguageChange(lang: string): void {
    this.translate.use(lang);
  }
  
  signOut() {}
  
}
