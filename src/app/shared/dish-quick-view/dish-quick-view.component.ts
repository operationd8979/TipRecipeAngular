import { Component, Input } from '@angular/core';
import { Dish, Ingredient, TypeDish } from 'src/app/models';

@Component({
  selector: 'shared-dish-quick-view',
  templateUrl: './dish-quick-view.component.html',
  styleUrls: ['./dish-quick-view.component.scss']
})
export class DishQuickViewComponent {

  @Input() dish: Dish = new Dish(
    "1234", 
    "cơm trứng", 
    "món ăn việt", 
    "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", 
    [new Ingredient("1","trứng",200,"gram"), new Ingredient("1","cơm",200,"gram")], 
    [new TypeDish("1234", "món chính")], 
    5);

}
