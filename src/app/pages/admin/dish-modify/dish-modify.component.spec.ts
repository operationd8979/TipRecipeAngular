import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishModifyComponent } from './dish-modify.component';

describe('DishModifyComponent', () => {
  let component: DishModifyComponent;
  let fixture: ComponentFixture<DishModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishModifyComponent]
    });
    fixture = TestBed.createComponent(DishModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
