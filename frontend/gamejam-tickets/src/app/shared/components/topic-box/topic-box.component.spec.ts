import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicBoxComponent } from './topic-box.component';

describe('TopicBoxComponent', () => {
  let component: TopicBoxComponent;
  let fixture: ComponentFixture<TopicBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
