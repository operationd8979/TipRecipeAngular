import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDishComponent } from './detail-dish.component';

describe('DetailDishComponent', () => {
  let component: DetailDishComponent;
  let fixture: ComponentFixture<DetailDishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDishComponent]
    });
    fixture = TestBed.createComponent(DetailDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
