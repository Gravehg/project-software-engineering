import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTextBoxComponent } from './ticket-text-box.component';

describe('TicketTextBoxComponent', () => {
  let component: TicketTextBoxComponent;
  let fixture: ComponentFixture<TicketTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTextBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
