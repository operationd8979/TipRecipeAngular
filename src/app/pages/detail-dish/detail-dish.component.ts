import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models';
import { DishService } from 'src/app/services/DishService/dish.service';

@Component({
  selector: 'app-detail-dish',
  templateUrl: './detail-dish.component.html',
  styleUrls: ['./detail-dish.component.scss']
})
export class DetailDishComponent implements OnInit {

  dish:Dish = new Dish("1234", "cơm trứng", "món ăn việt", "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", [], [], 5);
  dishSubjectSubscription: Subscription = new Subscription();

  constructor(private route:ActivatedRoute, private dishService:DishService) { 
  }

  ngOnInit() {
    this.dishSubjectSubscription = this.dishService.dishSelected$.subscribe(
      (dish:Dish) => {
        this.dish = dish;
      })
    this.route.params.subscribe(params => {
      this.dishService.getDeailtDish(params['id']);
    });
  }

}
