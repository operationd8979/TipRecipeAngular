import { KeyValue } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models';
import { DishService } from 'src/app/services/DishService/dish.service';

@Component({
  selector: 'app-dish-manager',
  templateUrl: './dishManager.component.html',
  styleUrls: ['./dishManager.component.scss']
})
export class DishManagerComponent implements OnDestroy {

  dishes: Dish[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  numberPages: number = 1;
  numberPagesArray: number[] = [];
  itemsPerPage: number = 4;

  dishesSubscriptions:Subscription = new Subscription();


  constructor(private dishService: DishService,private router: Router, private activedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.dishesSubscriptions = this.dishService.dishesAdminObservable$.subscribe((data) => {
      this.dishes = data.dishes;
      this.numberPages = Math.ceil(data.total / this.itemsPerPage);
      this.numberPagesArray = Array.from({length: this.numberPages}, (_, i) => i + 1);
    });
    this.callApiSearch();
  }

  callApiSearch() {
    this.currentPage = 1;
    this.fetchDishes(this.searchTerm, this.currentPage, this.itemsPerPage);
  }

  fetchDishes(query: string, page:number, itemsPerPage:number) {
    const offsetQuery = (page - 1) * itemsPerPage;
    this.dishService.getDishesByAdmin(query, offsetQuery, itemsPerPage);
    const queryParams: Params = { 
      query: query!=""?query:null, 
      page: page
    };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activedRoute,
        queryParams, 
        queryParamsHandling: 'merge',
      }
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchDishes(this.searchTerm, this.currentPage, this.itemsPerPage);
  }

  confirmDelete(dishID: string): void {
    if (confirm('Are you sure you want to delete this dish?')) {
      this.dishService.modifyVisibleDish(dishID).subscribe((response)=>{
        if(response.status===204){
          let dish : Dish = this.dishes.find(p=>p.getID() === dishID)!;
          dish.setIsDeleted(!dish.getIsDeleted());
        }
        else{
          alert("something wrong!");
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.dishesSubscriptions.unsubscribe();
  }

}
