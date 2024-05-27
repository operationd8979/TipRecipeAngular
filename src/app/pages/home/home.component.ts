import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dish, Ingredient, TagPayload, TypeDish } from 'src/app/models';
import { KeyValue } from '@angular/common';
import { DishService } from 'src/app/services/DishService/dish.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  query: string = '';
  types : KeyValue<number, string>[] = [];
  ingredients: KeyValue<number, string>[] = [];
  filterTypes: KeyValue<number, string>[] = [];
  filterIngredients: KeyValue<number, string>[] = [];
  offset: number = 0;
  itemsPerPage: number = 4;
  page: number = 1;
  dishes: Dish[] = [];
  selectedDish: Dish|null = null;

  dishesSubscriptions:Subscription = new Subscription();
  typesSubscriptions:Subscription = new Subscription();
  ingredientsSubscriptions:Subscription = new Subscription();
  dishSelectedSubscriptions:Subscription = new Subscription();

  get tagPayload(): TagPayload {
    return {
      filterIngredients: this.filterIngredients,
      filterTypes: this.filterTypes
    }
  }
  set tagPayload(val) {
    this.filterTypes = val.filterTypes;
    this.filterIngredients = val.filterIngredients;
  }

  constructor(private dishService:DishService,private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.dishSelectedSubscriptions = this.dishService.dishSelected$.subscribe((data) => {
      const queryParams: Params = { 
        selectedDish: data.getName()
      };
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams, 
          queryParamsHandling: 'merge',
        }
      );
      this.selectedDish = data;
    });
    this.dishesSubscriptions = this.dishService.dishesObservable$.subscribe((data) => {
      this.dishes = data;
    });
    this.ingredientsSubscriptions = this.dishService.ingredientsObservable$.subscribe((data) => {
      this.ingredients = data;
    });
    this.typesSubscriptions = this.dishService.typesObservable$.subscribe((data) => {
      this.types = data;
    });
    this.dishService.getIngredients();
    this.dishService.getTypes();
    this.getDishes();
  }

  callApiSearch() {
    this.getDishes();
  }

  getDishes() {
    const filterIngredients = this.filterIngredients.map((item) => item.key);
    const filterTypes = this.filterTypes.map((item) => item.key);
    const offset = (this.page - 1) * this.itemsPerPage;
    this.dishService.getDishes(this.query, filterIngredients, filterTypes, offset, this.itemsPerPage);
    const queryParams: Params = { 
      query: this.query!=""?this.query:null, 
      page: this.page,
      ingredients: this.filterIngredients.length>0?this.filterIngredients.map(ing => ing.value).join(","):null,
      types: this.filterTypes.length>0?this.filterTypes.map(type => type.value).join(","):null
    };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams, 
        queryParamsHandling: 'merge',
      }
    );
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
    this.dishSelectedSubscriptions.unsubscribe();
    this.dishesSubscriptions.unsubscribe();
    this.typesSubscriptions.unsubscribe();
    this.ingredientsSubscriptions.unsubscribe();
  }


}
