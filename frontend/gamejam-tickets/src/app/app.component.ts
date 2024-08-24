import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // translate: TranslateService = inject(TranslateService); //Esto lo comente porque me estaba dando unos problemas al utilizar rutas
  title = 'Gamejam-tickets';
}
