import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dish, TagPayload } from 'src/app/models';
import { KeyValue } from '@angular/common';
import { DishService } from 'src/app/services/DishService/dish.service';
import { Observable, Subject, Subscription, debounceTime, merge, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  query: string = '';
  private queryChangeSubject = new Subject<void>();
  types : KeyValue<number, string>[] = [];
  ingredients: KeyValue<number, string>[] = [];
  filterTypes: KeyValue<number, string>[] = [];
  filterIngredients: KeyValue<number, string>[] = [];
  offset: number = 0;
  itemsPerPage: number = 4;
  page: number = 1;
  dishes: Dish[] = [];
  selectedDish: Dish|null = null;
  recommendDishes: {key:string,value:string}[] = [];

  dishesSubscriptions:Subscription = new Subscription();
  typesSubscriptions:Subscription = new Subscription();
  ingredientsSubscriptions:Subscription = new Subscription();
  dishSelectedSubscriptions:Subscription = new Subscription();
  querySubscriptions:Subscription = new Subscription();
  recommendDishSubscription: Subscription = new Subscription();

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
    this.querySubscriptions = this.queryChangeSubject.asObservable().pipe(
      debounceTime(500),
    ).subscribe(() => {
      this.page = 1;
      this.callApiSearch();
    });
    this.recommendDishSubscription = this.dishService.recommendDishesObservable$.subscribe(recommendDishes => {
      this.recommendDishes = recommendDishes;
    });
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
    this.dishService.getRecommendDishes();
    this.dishService.getIngredients();
    this.dishService.getTypes();
    this.callApiSearch();
  }

  updateQuery(): void {
    this.queryChangeSubject.next();
  }

  callApiSearch() {
    this.getDishes(this.query, this.filterIngredients, this.filterTypes, this.page, this.itemsPerPage);
  }

  getDishes(query: string, filterIngredients:KeyValue<number, string>[], filterTypes:KeyValue<number, string>[], page:number, itemsPerPage:number) {
    const filterIngredientsQuery = filterIngredients.map((item) => item.key);
    const filterTypesQuery = filterTypes.map((item) => item.key);
    const offsetQuery = (page - 1) * itemsPerPage;
    this.dishService.getDishes(query, filterIngredientsQuery, filterTypesQuery, offsetQuery, itemsPerPage);
    const queryParams: Params = { 
      query: query!=""?query:null, 
      page: page,
      ingredients: filterIngredients.length>0?filterIngredients.map(ing => ing.value).join(","):null,
      types: filterTypes.length>0?filterTypes.map(type => type.value).join(","):null
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
      this.callApiSearch();
    } else if(option === 'next'){
      this.page = this.page + 1;
      this.callApiSearch();
    }
  }

  ngOnDestroy(): void {
    this.dishSelectedSubscriptions.unsubscribe();
    this.dishesSubscriptions.unsubscribe();
    this.typesSubscriptions.unsubscribe();
    this.ingredientsSubscriptions.unsubscribe();
    this.querySubscriptions.unsubscribe();
    this.recommendDishSubscription.unsubscribe();
  }


}
