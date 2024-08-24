import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSendButtonComponent } from './ticket-send-button.component';

describe('TicketSendButtonComponent', () => {
  let component: TicketSendButtonComponent;
  let fixture: ComponentFixture<TicketSendButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSendButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSendButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
