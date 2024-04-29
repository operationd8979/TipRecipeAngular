import { Component } from '@angular/core';
import { Dish } from 'src/app/types';

@Component({
  selector: 'shared-list-dish',
  templateUrl: './list-dish.component.html',
  styleUrls: ['./list-dish.component.scss']
})
export class ListDishComponent {

  listDish: Dish[] = [
    {
      dishID: "1234",
      dishName: "cơm trứng",
      summary: "món ăn việt", 
      url: "https://www.google.com", 
      ingredients: [], 
      type: [], 
      rating: 5
    },]

}
