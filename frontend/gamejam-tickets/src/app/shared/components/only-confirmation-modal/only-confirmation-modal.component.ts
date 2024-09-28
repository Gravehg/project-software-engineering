import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-only-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './only-confirmation-modal.component.html',
  styleUrl: './only-confirmation-modal.component.css'
})
export class OnlyConfirmationModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() confirmed: EventEmitter<void> = new EventEmitter();

  confirm() {
    this.confirmed.emit();
  }

}
