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
  nFatherChildInfoTextBox = '';
  nFatherChildInfoTopicBox = '';
  nFatherChildInfoCheck = '';
  //Función para optener le información brindada por el text-box
  public receptorFatherTextBox(nString:string){
    console.log("Msg "+nString);
    this.nFatherChildInfoTextBox = nString;
  }

  //Función para optener le información brindada por el topic-box
  public receptorFatherTopicBox(nString:string){
    console.log("Topic "+nString);
    this.nFatherChildInfoTopicBox = nString;
  }

  //Función para optener le información brindada por el topic-box
  public receptorFatherCheck(nString:string){
    console.log("Check id "+nString);
    this.nFatherChildInfoCheck = nString;
  }

  //Función para mandar ticketes al back-end
  public receptorFatherSendButton(nString:string){
    const ticketInfo = {
      text: this.nFatherChildInfoTextBox,
      topic: this.nFatherChildInfoTopicBox,
      check: this.nFatherChildInfoCheck
    };
  
    return {
      ticketInfo
    };
    // console.log("Mandamos la info "+nString);
    // console.log("Check id "+this.nFatherChildInfoCheck);
    // console.log("text id "+this.nFatherChildInfoTextBox);
    // console.log("top id "+this.nFatherChildInfoTopicBox);
    //this.nFatherChildInfoCheck = nString;
  }
}
