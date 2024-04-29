import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDishComponent } from './list-dish.component';

describe('ListDishComponent', () => {
  let component: ListDishComponent;
  let fixture: ComponentFixture<ListDishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDishComponent]
    });
    fixture = TestBed.createComponent(ListDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
