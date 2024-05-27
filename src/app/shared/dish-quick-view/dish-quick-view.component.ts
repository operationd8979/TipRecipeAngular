import { Component, Input } from '@angular/core';
import { Dish, Ingredient, TypeDish } from 'src/app/models';

@Component({
  selector: 'shared-dish-quick-view',
  templateUrl: './dish-quick-view.component.html',
  styleUrls: ['./dish-quick-view.component.scss']
})
export class DishQuickViewComponent {

  @Input() dish: Dish|null = null;

}
