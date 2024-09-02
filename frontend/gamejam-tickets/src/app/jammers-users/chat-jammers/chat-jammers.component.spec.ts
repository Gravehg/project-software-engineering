import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatJammersComponent } from './chat-jammers.component';

describe('ChatJammersComponent', () => {
  let component: ChatJammersComponent;
  let fixture: ComponentFixture<ChatJammersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatJammersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatJammersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
