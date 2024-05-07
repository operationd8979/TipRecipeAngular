import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models';
import { DishService } from 'src/app/services/DishService/dish.service';

@Component({
  selector: 'shared-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss']
})
export class DishItemComponent implements OnInit {


  constructor(private dishService:DishService) { }

  @Input() dish: Dish = new Dish("1234", "cơm trứng", "món ăn việt", "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", [], [], 5);

  ngOnInit(): void {

  }
  
  onClickQuickView() {
    this.dishService.getDeailtDish(this.dish.getID());
    // this.dishService.setSelectedDish(this.dish);
  }
}
