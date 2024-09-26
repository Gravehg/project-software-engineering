import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupportFormComponent } from './create-support-form.component';

describe('CreateSupportFormComponent', () => {
  let component: CreateSupportFormComponent;
  let fixture: ComponentFixture<CreateSupportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSupportFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSupportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
