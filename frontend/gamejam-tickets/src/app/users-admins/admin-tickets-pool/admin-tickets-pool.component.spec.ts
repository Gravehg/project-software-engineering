import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPoolComponent } from './admin-tickets-pool.component';

describe('TicketsPoolComponent', () => {
  let component: TicketsPoolComponent;
  let fixture: ComponentFixture<TicketsPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsPoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
