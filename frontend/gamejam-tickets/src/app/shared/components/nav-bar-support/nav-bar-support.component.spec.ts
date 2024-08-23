import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSupportComponent } from './nav-bar-support.component';

describe('NavBarSupportComponent', () => {
  let component: NavBarSupportComponent;
  let fixture: ComponentFixture<NavBarSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
