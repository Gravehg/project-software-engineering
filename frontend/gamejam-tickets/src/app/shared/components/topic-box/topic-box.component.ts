import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topic-box',
  standalone: true,
  imports: [],
  templateUrl: './topic-box.component.html',
  styleUrl: './topic-box.component.css'
})
export class TopicBoxComponent {
  @Output() newMessageEvent = new EventEmitter<string>();
  

  public onChangeAction(event: Event): void {
    
    const input = event.target as HTMLTextAreaElement;
    const newValue = input.value;
    this.newMessageEvent.emit(newValue);
  }

}
