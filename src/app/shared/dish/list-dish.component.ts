import { Component } from '@angular/core';
import { Dish, Ingredient, TypeDish } from 'src/app/models';

@Component({
  selector: 'shared-list-dish',
  templateUrl: './list-dish.component.html',
  styleUrls: ['./list-dish.component.scss']
})
export class ListDishComponent {

  listDish: Dish[] = [
    new Dish(
      "1234", 
      "cơm ", 
      "món ăn việt", 
      "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", 
      [new Ingredient("1","trứng",200,"gram"), new Ingredient("1","cơm",200,"gram")], 
      [new TypeDish("1","món chính")], 
      5),
    new Dish(
      "1234", 
      "cơm trứng", 
      "món ăn việt", 
      "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", 
      [new Ingredient("1","trứng",200,"gram"), new Ingredient("1","cơm",200,"gram")], 
      [new TypeDish("1","món chính")], 
      5),
    new Dish(
      "1234", 
      "cơm trứng", 
      "món ăn việt", 
      "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", 
      [new Ingredient("1","trứng",200,"gram"), new Ingredient("1","cơm",200,"gram")], 
      [new TypeDish("1","món chính")], 
      5),
  ];

  // listDish: Dish[] = [];

}
