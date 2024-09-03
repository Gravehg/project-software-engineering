import { Component, inject } from '@angular/core';
import { CheckComponent } from '../check/check.component';
import { TicketTextBoxComponent } from '../ticket-text-box/ticket-text-box.component';
import { TicketSendButtonComponent } from '../ticket-send-button/ticket-send-button.component';
import { TopicBoxComponent } from '../topic-box/topic-box.component';
import {TicketService} from '../../../services/ticket.service';
import {ticket} from '../../../models/ticket.model';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ticket-box',
  standalone: true,
  imports: [CheckComponent,TicketTextBoxComponent,TicketSendButtonComponent,TopicBoxComponent,TranslateModule],
  templateUrl: './ticket-box.component.html',
  styleUrl: './ticket-box.component.css'
})
export class TicketBoxComponent {
  translate: TranslateService = inject(TranslateService);
  nFatherChildInfoTextBox = '';
  nFatherChildInfoTopicBox = '';
  nFatherChildInfoCheck = '';
  constructor(public TicketService: TicketService) {}
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
      category: this.nFatherChildInfoCheck
    };
    if(this.fullInfo(this.nFatherChildInfoTextBox, this.nFatherChildInfoCheck, this.nFatherChildInfoTopicBox)){
      this.TicketService.sendTicket(ticketInfo).subscribe({
        next: (response) => {
          if (response.success) {
            this.triggerSuccess();
            console.log("send ticket")
          } else {
            this.triggerFailure();
            console.error('Error sending message:', response.msg);
          }
        },
        error: (error) => {
          this.triggerFailure();
          console.error('Error sending message:', error);
        },
      }); 
    }else{
      this.triggerFailure();
      console.error('Error sending message:');
      
    } 
  }
  triggerSuccess() {
    const translatedTitle = this.translate.instant('SUCCESS_LOGIN_ALERT_TITLE');
    const translatedText = this.translate.instant('ALERT_SUCCESS_TICKET_SEND');
    Swal.fire({
      icon: 'success',
      title: translatedTitle,
      text: translatedText,
    });
  }

  triggerFailure() {
    const translatedTitle = this.translate.instant('FAILURE_LOGIN_ALERT_TITLE');
    const translatedText = this.translate.instant('ALERT_ERROR_TICKET_SEND');
    Swal.fire({
      icon: 'error',
      title: translatedTitle,
      text: translatedText,
    });
  }

  fullInfo(text:string,category:string,topic:string){
    if(text!='' && category!='' && topic!=''){
      return true;
    }else{
      return false;
    }
  }
}


