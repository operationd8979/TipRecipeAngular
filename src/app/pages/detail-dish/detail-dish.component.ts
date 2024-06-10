import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { message } from 'src/app/constants';
import { Dish } from 'src/app/models';
import { ToastService } from 'src/app/services';
import { DishService } from 'src/app/services/DishService/dish.service';

@Component({
  selector: 'app-detail-dish',
  templateUrl: './detail-dish.component.html',
  styleUrls: ['./detail-dish.component.scss']
})
export class DetailDishComponent implements OnInit {

  ratingForm: FormGroup = new FormGroup({});

  dish:Dish = new Dish("1234", "cơm trứng", "món ăn việt", "https://cdn11.dienmaycholon.vn/filewebdmclnew/public//userupload/images/cach-nau-com-ngon-va-lau-thiu-3.jpg", [], [], 5);
  dishSubjectSubscription: Subscription = new Subscription();

  constructor(private route:ActivatedRoute, private dishService:DishService, private toastService: ToastService) { 
  }

  ngOnInit() {
    this.dishSubjectSubscription = this.dishService.dishSelected$.subscribe(
      (dish:Dish) => {
        this.dish = dish;
        this.ratingForm.reset();
      })
    this.route.params.subscribe(params => {
      this.dishService.getDeailtDish(params['id']);
    });
    this.ratingForm = new FormGroup({
      ratingScore: new FormControl('', [Validators.required,this.ratingInvalid.bind(this)])
    });
  }

  onSubmit() {
    const { ratingScore } = this.ratingForm.value;
    this.dishService.rateDish(this.dish.getID(), ratingScore).subscribe(
        (response) => {
            if(response.status === 204){
              this.toastService.showSuccess(message.MESSAGE_RATE_SUCCESS);
              this.dish.setRating(ratingScore);
              this.ratingForm.reset();
            }
        },
        (error) => {
            const errorMessage = error.error.message;
            this.toastService.showError(errorMessage);
        },
    );
  }

  ratingInvalid(control: FormControl) : {[s: string]: boolean} {
    if(control.value < 0 || control.value > 10){
      return {'invalidRating': true};
    }
    return {};
  }

}
