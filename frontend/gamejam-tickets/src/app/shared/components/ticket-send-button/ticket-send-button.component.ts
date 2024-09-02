import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'app-ticket-send-button',
  standalone: true,
  imports: [],
  templateUrl: './ticket-send-button.component.html',
  styleUrl: './ticket-send-button.component.css'
})
export class TicketSendButtonComponent {
  @Output() newMessageEvent = new EventEmitter<string>();


  public btnClick():void{
    this.newMessageEvent.emit('1');
  }
}
