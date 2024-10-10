import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyConfirmationModalComponent } from './only-confirmation-modal.component';

describe('OnlyConfirmationModalComponent', () => {
  let component: OnlyConfirmationModalComponent;
  let fixture: ComponentFixture<OnlyConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlyConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlyConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
