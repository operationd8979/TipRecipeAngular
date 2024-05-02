import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishQuickViewComponent } from './dish-quick-view.component';

describe('DishQuickViewComponent', () => {
  let component: DishQuickViewComponent;
  let fixture: ComponentFixture<DishQuickViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishQuickViewComponent]
    });
    fixture = TestBed.createComponent(DishQuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
