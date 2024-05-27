import { KeyValue } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AuthService } from "../AuthService";
import { config } from 'src/app/constants';
import { Dish, Ingredient, TypeDish } from "src/app/models";

interface ingredientsResponse {
    ingredientId: number;
    ingredientName: string;
}
interface typesResponse {
    typeID: number;
    typeName: string;
}
interface dishResponse {
    dishID: string;
    dishName: string;
    summary: string;
    urlPhoto: string;
    detailIngredientDishes: {
        ingredient: {
            ingredientId: number;
            ingredientName: string;
        },
        amount: number;
        unit: string
    }[];
    detailTypeDishes: {
        type: {
            typeID: number;
            typeName: string;
        }
    }[];
    ratingScore: number;
    isRated: boolean;
    recipe:{
        content: string;
    };
}
@Injectable({providedIn: 'root'})
export class DishService {

    private dishSubject$ = new BehaviorSubject<Dish[]>([]);
    dishesObservable$ = this.dishSubject$.asObservable();
    private ingredientSubject$ = new BehaviorSubject<KeyValue<number,string>[]>([]);
    ingredientsObservable$ = this.ingredientSubject$.asObservable();
    private typeSubject$ = new BehaviorSubject<KeyValue<number,string>[]>([]);
    typesObservable$ = this.typeSubject$.asObservable();
    private errorSubject$ = new Subject<string>();
    errorObserable$ = this.errorSubject$.asObservable();
    dishSelected$ = new Subject<Dish>();

    constructor(private httpClient: HttpClient,private authService: AuthService) {
        
    }

    getDishes(query: string, filterIngredients: number[] = [], filterTypes: number[] = [], offset: number = 0, itemsPerPage: number = 5) {
        const queryParams = new HttpParams()
            .set('query', query)
            .set('ingredients', filterIngredients.join(','))
            .set('types', filterTypes.join(','))
            .set('itemsPerPage', itemsPerPage)
            .set('offset', offset);
        this.httpClient.get<dishResponse[]>(config.serverUrl +'dish', {params: queryParams}).subscribe(
            (response) => {
                const dishes:Dish[] = response.map((item) => {
                    const ingredients = item.detailIngredientDishes.map((ingredient) => {
                        return new Ingredient(ingredient.ingredient.ingredientId,ingredient.ingredient.ingredientName,ingredient.amount,ingredient.unit);
                    });
                    const types = item.detailTypeDishes.map((type) => {
                        return new TypeDish(type.type.typeID,type.type.typeName);
                    });
                    return new Dish(item.dishID, item.dishName, item.summary, item.urlPhoto, ingredients, types, item.ratingScore, item.isRated);
                });
                this.dishSubject$.next(dishes);
                this.getDeailtDish(dishes[0].getID());
                this.errorSubject$.next('');
            },
            (error) => {
                if(error.status === 401){
                    this.authService.logout();
                    return;
                }
                this.dishSubject$.next([]);
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            },
        );
        
    }

    getIngredients(){
        this.httpClient.get<ingredientsResponse[]>(config.serverUrl +'ingredients').subscribe(
            (response) => {
                const data = response.map((item) => {
                    return {key: item.ingredientId, value: item.ingredientName};
                });
                this.ingredientSubject$.next(data);
            },
            (error) => {
                if(error.status === 401){
                    this.authService.logout();
                    return;
                }
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            },
        );
    }

    getTypes(){
        this.httpClient.get<typesResponse[]>(config.serverUrl +'types').subscribe(
            (response) => {
                const data = response.map((item) => {
                    return {key: item.typeID, value: item.typeName};
                });
                this.typeSubject$.next(data);
            },
            (error) => {
                if(error.status === 401){
                    this.authService.logout();
                    return;
                }
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            },
        );
    }

    setSelectedDish(dish: Dish){
        this.dishSelected$.next(dish);
    }

    getDeailtDish(dishID: string){
        this.httpClient.get<dishResponse>(config.serverUrl +'dish/'+dishID).subscribe(
            (response) => {
                const ingredients = response.detailIngredientDishes.map((ingredient) => {
                    return new Ingredient(ingredient.ingredient.ingredientId,ingredient.ingredient.ingredientName,ingredient.amount,ingredient.unit);
                });
                const types = response.detailTypeDishes.map((type) => {
                    return new TypeDish(type.type.typeID,type.type.typeName);
                });
                const dish = new Dish(response.dishID, response.dishName, response.summary, response.urlPhoto, ingredients, types, response.ratingScore, response.isRated);
                dish.setRecipe(response.recipe.content);
                this.dishSelected$.next(dish);
                this.errorSubject$.next('');
            },
            (error) => {
                if(error.status === 403){
                    this.authService.logout();
                    return;
                }
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            },
        );
    }

    rateDish(dishID: string, rating: number){
        const body = {
            dishID: dishID,
            ratingScore: rating
        };
        this.httpClient.post(config.serverUrl +'dish/rating', body).subscribe(
            (response) => {
                this.getDeailtDish(dishID);
                this.errorSubject$.next('');
            },
            (error) => {
                if(error.status === 403){
                    this.authService.logout();
                    return;
                }
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            },
        );
    }

}