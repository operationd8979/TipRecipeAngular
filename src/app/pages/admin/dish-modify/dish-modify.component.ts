import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/models';
import { DishService } from 'src/app/services/DishService/dish.service';

@Component({
  selector: 'app-dish-modify',
  templateUrl: './dish-modify.component.html',
  styleUrls: ['./dish-modify.component.scss']
})
export class DishModifyComponent implements OnInit {

  dish: any = {
    id: '0',
    dishName: '',
    summary: '',
    url: '',
    content: ''
  };

  tags: string = '';
  filterIngredients = [
    { name: 'Ingredient1', amount: 1, unit: 'cup' },
    // Thêm các nguyên liệu khác nếu cần
  ];
  filterTypes = ['Type1', 'Type2'];


  constructor(private route: ActivatedRoute,private dishService: DishService){
    
  }

  ngOnInit(): void {
    this.dishService.dishSelectedObservable$.subscribe(dish => {
      this.dish.id = dish.getID();
      this.dish.dishName = dish.getName();
      this.dish.summary = dish.getSummary();
      this.dish.url = dish.getUrl();
      this.dish.content = dish.getRecipe();
      // this.tags = dish.detailTypeDishes.map(type => type.type.typeName).join(', ');
      // this.filterIngredients = dish.detailIngredientDishes.map(ingredient => {
      //   return {
      //     name: ingredient.ingredient.ingredientName,
      //     amount: ingredient.amount,
      //     unit: ingredient.unit
      //   };
      // });
    });

    this.route.params.subscribe(params => {
      if(params['id']!=="0"){
        this.dishService.getDeailtDish(params['id']);
      }
    }).unsubscribe();
  }

  

  onFileSelected(event: any) {
    // Xử lý tải lên tệp
  }

  callUpdateFromDom() {
    // Gọi hàm cập nhật từ DOM
  }

}
