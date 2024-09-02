import { Component, EventEmitter, Output, output } from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-ticket-send-button',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './ticket-send-button.component.html',
  styleUrl: './ticket-send-button.component.css'
})
export class TicketSendButtonComponent {
  @Output() newMessageEvent = new EventEmitter<string>();


  public btnClick():void{
    this.newMessageEvent.emit('1');
  }
}
