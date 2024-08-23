import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarJammerComponent } from './nav-bar-jammer.component';

describe('NavBarJammerComponent', () => {
  let component: NavBarJammerComponent;
  let fixture: ComponentFixture<NavBarJammerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarJammerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarJammerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
