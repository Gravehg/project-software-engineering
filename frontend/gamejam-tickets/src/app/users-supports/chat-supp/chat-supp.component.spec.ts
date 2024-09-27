import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSuppComponent } from './chat-supp.component';

describe('ChatSuppComponent', () => {
  let component: ChatSuppComponent;
  let fixture: ComponentFixture<ChatSuppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSuppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
