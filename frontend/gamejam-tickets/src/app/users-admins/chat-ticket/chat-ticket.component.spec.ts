import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTicketComponent } from './chat-ticket.component';

describe('ChatTicketComponent', () => {
  let component: ChatTicketComponent;
  let fixture: ComponentFixture<ChatTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
