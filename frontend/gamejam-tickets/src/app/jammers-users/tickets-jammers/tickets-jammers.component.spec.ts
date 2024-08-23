import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsJammersComponent } from './tickets-jammers.component';

describe('TicketsJammersComponent', () => {
  let component: TicketsJammersComponent;
  let fixture: ComponentFixture<TicketsJammersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsJammersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsJammersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
