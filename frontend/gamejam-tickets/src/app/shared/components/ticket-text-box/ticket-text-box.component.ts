import { Component, EventEmitter, Output } from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-ticket-text-box',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './ticket-text-box.component.html',
  styleUrl: './ticket-text-box.component.css'
})
export class TicketTextBoxComponent {
  @Output() newMessageEvent = new EventEmitter<string>();
  

  public onChangeAction(event: Event): void {
    
    const input = event.target as HTMLTextAreaElement;
    const newValue = input.value;
    this.newMessageEvent.emit(newValue);
  }

}
