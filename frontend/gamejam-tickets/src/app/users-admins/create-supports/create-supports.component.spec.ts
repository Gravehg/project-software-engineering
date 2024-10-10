import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupportsComponent } from './create-supports.component';

describe('CreateSupportsComponent', () => {
  let component: CreateSupportsComponent;
  let fixture: ComponentFixture<CreateSupportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSupportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSupportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
