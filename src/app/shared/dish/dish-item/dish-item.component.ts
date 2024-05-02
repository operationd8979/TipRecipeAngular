import { Component, Input } from '@angular/core';
import { Dish } from 'src/app/models';

@Component({
  selector: 'shared-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss']
})
export class DishItemComponent {

  @Input() dish: Dish = new Dish("1234", "cơm trứng", "món ăn việt", "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", [], [], 5);

}
