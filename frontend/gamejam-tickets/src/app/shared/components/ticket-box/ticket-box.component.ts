import { Component } from '@angular/core';
import { CheckComponent } from '../check/check.component';
import { TicketTextBoxComponent } from '../ticket-text-box/ticket-text-box.component';
import { TicketSendButtonComponent } from '../ticket-send-button/ticket-send-button.component';
import { TopicBoxComponent } from '../topic-box/topic-box.component';


@Component({
  selector: 'app-ticket-box',
  standalone: true,
  imports: [CheckComponent,TicketTextBoxComponent,TicketSendButtonComponent,TopicBoxComponent],
  templateUrl: './ticket-box.component.html',
  styleUrl: './ticket-box.component.css'
})
export class TicketBoxComponent {
  nFatherChildInfo = ''
  public reseptorFather(nString:string){
    console.log(nString);
    this.nFatherChildInfo = nString;
  }
  

}
