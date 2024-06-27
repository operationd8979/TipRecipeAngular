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

  @Input() dish: Dish|null = null;

  ngOnInit(): void {

  }
  
  onClickQuickView() {
    if(this.dish == null) return;
    this.dishService.getDeailtDish(this.dish.getID());
  }

}
