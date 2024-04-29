import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainTextCardComponent } from './plain-text-card.component';

describe('PlainTextCardComponent', () => {
  let component: PlainTextCardComponent;
  let fixture: ComponentFixture<PlainTextCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlainTextCardComponent]
    });
    fixture = TestBed.createComponent(PlainTextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
