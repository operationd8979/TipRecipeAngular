import { KeyValue } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { errorMessage, message } from 'src/app/constants';
import { Dish } from 'src/app/models';
import { ToastService } from 'src/app/services';
import { DishService } from 'src/app/services/DishService/dish.service';

@Component({
  selector: 'app-dish-manager',
  templateUrl: './dishManager.component.html',
  styleUrls: ['./dishManager.component.scss']
})
export class DishManagerComponent implements AfterViewChecked, OnDestroy {

  dishes: Dish[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  numberPages: number = 1;
  numberPagesArray: number[] = [];
  itemsPerPage: number = 4;

  dishesSubscriptions:Subscription = new Subscription();

  constructor(
    private dishService: DishService,
    private router: Router, 
    private activedRoute : ActivatedRoute, 
    private toastService:ToastService,
    private cdr: ChangeDetectorRef) {

  }

  ngAfterViewChecked() {
    this.cdr.detectChanges(); 
  }

  ngOnInit(): void {
    this.dishesSubscriptions = this.dishService.dishesAdminObservable$.subscribe((data) => {
      this.dishes = data.dishes;
      this.numberPages = Math.ceil(data.total / this.itemsPerPage);
      this.numberPagesArray = Array.from({length: this.numberPages}, (_, i) => i + 1);
    });
    this.callApiSearch();
  }

  callApiSearch() {
    this.currentPage = this.activedRoute.snapshot.queryParams['page'] || 1;
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
          let dish : Dish = this.dishes.find(d=>d.getID() === dishID)!;
          if(dish.getIsDeleted()){
            this.toastService.showSuccess(message.MESSAGE_PUBLIC_SUCCESS);
          }
          else{
            this.toastService.showSuccess(message.MESSAGE_HIDE_SUCCESS);
          }
          dish.setIsDeleted(!dish.getIsDeleted());
        }
        else{
          this.toastService.showSuccess(errorMessage.MESSAGE_UNKNOWN_ERROR);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.dishesSubscriptions.unsubscribe();
  }

}
