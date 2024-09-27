import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPoolComponent } from './admin-pool.component';

describe('AdminPoolComponent', () => {
  let component: AdminPoolComponent;
  let fixture: ComponentFixture<AdminPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
