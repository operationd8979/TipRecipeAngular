import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, range } from 'rxjs';
import { errorMessage, message } from 'src/app/constants';
import { Dish, Ingredient, TagPayload, TypeDish } from 'src/app/models';
import { ToastService } from 'src/app/services';
import { CanComponentDeactivate } from 'src/app/services/AuthGuard/can-deactivate.guard';
import { DishService } from 'src/app/services/DishService/dish.service';

@Component({
  selector: 'app-dish-modify',
  templateUrl: './dish-modify.component.html',
  styleUrls: ['./dish-modify.component.scss']
})
export class DishModifyComponent implements OnInit, OnDestroy, CanComponentDeactivate, AfterViewChecked {

  dishSubscriptions:Subscription = new Subscription();
  typesSubscriptions:Subscription = new Subscription();
  ingredientsSubscriptions:Subscription = new Subscription();

  isRender: boolean = false;
  error: string = "";

  isEdit: boolean = false;

  dish: any = {
    id: '',
    dishName: '',
    summary: '',
    url: '',
    content: ''
  };
  blobImage: Blob | null = null;

  rawDish:Dish|null = null;

  // tags: string = '';
  filterTypes: KeyValue<number, string>[] = [];
  filterIngredients: KeyValue<number, string>[] = [];
  filterIngredients2: {id: number ,name: string, amount: number, unit: string }[] = [];

  types : KeyValue<number, string>[] = [];
  ingredients: KeyValue<number, string>[] = [];

  get tagPayload(): TagPayload {
    return {
      filterIngredients: this.filterIngredients,
      filterTypes: this.filterTypes
    }
  }
  set tagPayload(val) {
    this.filterIngredients = val.filterIngredients;
    this.filterTypes = val.filterTypes;
    let oldLength = this.filterIngredients2.length;
    let newLength = this.filterIngredients.length;
    if(newLength>oldLength){
      let newIngredient = this.filterIngredients[newLength-1]; 
      this.filterIngredients2.push({id: newIngredient.key, name: newIngredient.value, amount:0, unit:'gram'});
    }
    else{
      this.filterIngredients2.splice(newLength,oldLength-newLength);
    }
  }

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private dishService: DishService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef){
    
  }

  translateDish(dish:Dish):any{
    let tempDish:any = {};
    tempDish.id = dish.getID();
    tempDish.dishName = dish.getName();
    tempDish.summary = dish.getSummary();
    tempDish.url = dish.getUrl();
    tempDish.content = dish.getRecipe();
    return tempDish;
  }

  ngOnInit(): void {
    this.dishSubscriptions = this.dishService.dishSelectedObservable$.subscribe(dish => {
      this.rawDish = dish;
      this.filterTypes = dish.getTypes().map(type => ({ key: type.getID(), value: type.getName() }));
      this.filterIngredients = dish.getIngredients().map(ingredient => ({ key: ingredient.getID(), value: ingredient.getName() }));
      this.filterIngredients2 = dish.getIngredients().map(ingredient => ({ id: ingredient.getID(), name: ingredient.getName(), amount: ingredient.getQuantity(), unit: ingredient.getUnit() }));
      this.dish = this.translateDish(dish);
      this.isRender = true;
    });
    this.ingredientsSubscriptions = this.dishService.ingredientsObservable$.subscribe((data) => {
      this.ingredients = data;
    });
    this.typesSubscriptions = this.dishService.typesObservable$.subscribe((data) => {
      this.types = data;
    });
    this.route.params.subscribe(params => {
      if(params['id']!=="0"){
        this.dishService.getDeailtDish(params['id']);
        this.isEdit = true;
      }
      else{
        this.dishSubscriptions.unsubscribe();
      }
    });
    this.dishService.getIngredients();
    this.dishService.getTypes();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges(); 
  }

  
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
          const newHeight = Math.floor(Math.random() * 100) + 600;
          const resizedImage = await this.resizeImage(img, img.width/img.height*newHeight, newHeight);
          if (resizedImage) {
            this.toastService.showInfo(message.MESSAGE_CHANGE_PHOTO_SUCCESS);
            this.changeImage(resizedImage);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  resizeImage(img: HTMLImageElement, maxWidth: number, maxHeight: number): Promise<Blob | null> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width));
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width *= maxHeight / height));
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx!.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.7);
    });
  }

  changeImage(imageBlob: Blob) {
    this.blobImage = imageBlob;
    URL.revokeObjectURL(this.dish.url);
    this.dish.url = URL.createObjectURL(imageBlob);
  }

  validate():boolean {
    const result = true;
    if(this.isEdit && this.dish.id === ""){
      this.error = errorMessage.DISH_ID_EMPTY;
      return false;
    }
    if(this.dish.dishName === ""){
      this.error = errorMessage.DISH_NAME_EMPTY;
      return false;
    }
    if(this.dish.summary === ""){
      this.error = errorMessage.DISH_SUMMARY_EMPTY;
      return false;
    }
    if(this.filterIngredients.length === 0){
      this.error = errorMessage.DISH_INGREDIENT_EMPTY;
      return false;
    }
    if(this.filterTypes.length === 0){
      this.error = errorMessage.DISH_TYPE_EMPTY;
      return false;
    }
    if(this.dish.content === ""){
      this.error = errorMessage.DISH_CONTENT_EMPTY;
      return false;
    }
    if(!this.isEdit && this.blobImage === null){
      this.error = errorMessage.DISH_IMAGE_EMPTY;
      return false;
    }
    this.error = "";
    return result;
  }

  uploadDish() {
    if(this.validate()){
      if(this.isEdit){
        this.dishService.postUpdateDish(
          this.dish.id,
          this.dish.dishName, 
          this.dish.summary, 
          this.filterIngredients2.map(i=> ({Ingredient:{IngredientId:i.id,IngredientName:i.name},Amount:i.amount,Unit:i.unit})), 
          this.filterTypes.map(t=> ({Type:{TypeID:t.key,TypeName:t.value}})),
          {Content: this.dish.content}, 
          this.blobImage
        ).subscribe(
            (response) => {
              if(response.status===201){
                if(this.isEdit){
                  this.toastService.showSuccess(message.MESSAGE_UPDATE_SUCCESS);
                }
                else{
                  this.toastService.showSuccess(message.MESSAGE_CREATE_SUCCESS);
                }
                this.error = "";
                URL.revokeObjectURL(this.dish.url);
                this.blobImage = null;
              }
            },
            (error) => {
              this.error = `[Server error]`;
            }
          );
      }
      else{
        this.dishService.postAddDish(
          this.dish.dishName, 
          this.dish.summary, 
          this.filterIngredients2.map(i=> ({Ingredient:{IngredientId:i.id,IngredientName:i.name},Amount:i.amount,Unit:i.unit})), 
          this.filterTypes.map(t=> ({Type:{TypeID:t.key,TypeName:t.value}})),
          {Content: this.dish.content}, 
          this.blobImage
        ).subscribe(
            (response) => {
              if(response.status===201){
                this.error = "";
                this.dish.id = response.body.dishID;
                URL.revokeObjectURL(this.dish.url);
                this.blobImage = null;
                this.dish.url = response.body.urlPhoto;
                this.isEdit = true;
                alert("successful");
              }
            },
            (error) => {
              this.error = `[Server error]`;
            }
          );
      }
    }
  }

  ngOnDestroy(): void {
    this.dishSubscriptions.unsubscribe();
    this.typesSubscriptions.unsubscribe();
    this.ingredientsSubscriptions.unsubscribe();
  }

  //can deactivate
  private isChangesSaved(): boolean {
    if(this.rawDish != null){
      var tempDish = this.translateDish(this.rawDish);
      if(JSON.stringify(this.dish) !== JSON.stringify(tempDish)){
        return false;
      }
    }
    else{
      if(this.validate()){
        return false;
      }
    }
    return true;
  }

  async canDeactivate(): Promise<boolean> {
    if (!this.isChangesSaved()) {
      const confirmation = window.confirm('You have unsaved changes. Do you really want to leave?');
      if (confirmation) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }


}
