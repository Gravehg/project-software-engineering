import { Component, inject, Input, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UsertTicket } from '../../../models/userTicket.model';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  translate: TranslateService = inject(TranslateService);
  @Input() ticket: UsertTicket = { _id: '', idUserIssued: '', idSupport: '', resolutionState: '', closureState: '', category: '', topic: '', creationDate: '', email: '', date: '' };
}
