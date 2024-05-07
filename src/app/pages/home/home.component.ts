import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dish, Ingredient, TagPayload, TypeDish } from 'src/app/models';
import { KeyValue } from '@angular/common';
import { DishService } from 'src/app/services/DishService/dish.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  query: string = '';
  tagValue: string = '';
  types : KeyValue<string, string>[] = [{key: "1", value: 'chính'}, {key: "2", value: 'tráng miệng'}, {key: "3", value: 'món Việt'}];
  ingredients: KeyValue<string, string>[] = [{key: "1", value: 'thịt'}, {key: "2", value: 'rau'}, {key: "3", value: 'cá'}, {key: "4", value: 'tôm'}];
  filterTypes: KeyValue<string, string>[] = [];
  filterIngredients: KeyValue<string, string>[] = [];
  offset: number = 0;
  itemsPerPage: number = 4;
  page: number = 1;
  dishes: Dish[] = [];
  selectedDish: Dish = new Dish(
    "1234", 
    "cơm trứng", 
    "món ăn việt", 
    "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", 
    [new Ingredient("1","trứng",200,"gram"), new Ingredient("1","cơm",200,"gram")], 
    [new TypeDish("1234", "món chính")], 
  5);;

  dishesSubscriptions:Subscription = new Subscription();
  typesSubscriptions:Subscription = new Subscription();
  ingredientsSubscriptions:Subscription = new Subscription();
  dishSelectedSubscriptions:Subscription = new Subscription();



  get tagPayload(): TagPayload[] {
    return [
      {payload: this.types, filter: this.filterTypes},
      {payload: this.ingredients, filter: this.filterIngredients}
    ];
  }
  set tagPayload(val) {
    this.types = val[0].payload;
    this.filterTypes = val[0].filter;
    this.ingredients = val[1].payload;
    this.filterIngredients = val[1].filter;
  }

  constructor(private dishService:DishService) { }

  ngOnInit(): void {
    this.dishSelectedSubscriptions = this.dishService.dishSelected$.subscribe((data) => {
      this.selectedDish = data;
    });
    this.dishesSubscriptions = this.dishService.ingredientSubject$.subscribe((data) => {
      this.ingredients = data;
    });
    this.typesSubscriptions = this.dishService.typesSubject$.subscribe((data) => {
      this.types = data;
    });
    this.ingredientsSubscriptions = this.dishService.dishSubject$.subscribe((data) => {
      this.dishes = data;
    });
    this.dishService.getIngredients();
    this.dishService.getTypes();
    this.getDishes();
  }

  callApiSearch() {
    this.getDishes();
  }

  getDishes() {
    const filterIngredients = this.filterIngredients.map((item) => parseInt(item.key));
    const filterTypes = this.filterTypes.map((item) => parseInt(item.key));
    const offset = (this.page - 1) * this.itemsPerPage;
    this.dishService.getDishes(this.query, filterIngredients, filterTypes, offset, this.itemsPerPage);
  }

  onClickChangePage(option: string){
    if(option === 'prev'){
      this.page = this.page - 1;
      this.getDishes();
    } else if(option === 'next'){
      this.page = this.page + 1;
      this.getDishes();
    }
  }

  ngOnDestroy(): void {
    this.dishesSubscriptions.unsubscribe();
    this.typesSubscriptions.unsubscribe();
    this.ingredientsSubscriptions.unsubscribe();
    this.dishSelectedSubscriptions.unsubscribe();
  }


}
