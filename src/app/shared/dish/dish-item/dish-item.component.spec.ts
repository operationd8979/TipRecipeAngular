import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishItemComponent } from './dish-item.component';

describe('DishItemComponent', () => {
  let component: DishItemComponent;
  let fixture: ComponentFixture<DishItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishItemComponent]
    });
    fixture = TestBed.createComponent(DishItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
