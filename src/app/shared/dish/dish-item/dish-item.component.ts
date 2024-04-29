import { Component, Input } from '@angular/core';
import { Dish } from 'src/app/types';

@Component({
  selector: 'shared-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss']
})
export class DishItemComponent {

  @Input() dish: Dish = {
    dishID: "1234",
    dishName: "cơm trứng",
    summary: "món ăn việt", 
    url: "https://www.google.com", 
    ingredients: [], 
    type: [], 
    rating: 5
  };

}
