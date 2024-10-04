import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsBySupportComponent } from './tickets-by-support.component';

describe('TicketsBySupportComponent', () => {
  let component: TicketsBySupportComponent;
  let fixture: ComponentFixture<TicketsBySupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsBySupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsBySupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
