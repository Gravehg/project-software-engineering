import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySuppTicketsComponent } from './my-supp-tickets.component';

describe('MySuppTicketsComponent', () => {
  let component: MySuppTicketsComponent;
  let fixture: ComponentFixture<MySuppTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySuppTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySuppTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
