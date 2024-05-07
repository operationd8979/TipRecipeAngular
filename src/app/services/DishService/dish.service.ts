import { KeyValue } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AuthService } from "../AuthService";
import { config } from 'src/app/constants';
import { Dish, Ingredient, TypeDish } from "src/app/models";

interface dishRequest{
    search: string;
    ingredients: number[];
    types: number[];
    itemsPerPage: number;
    offset: number;
}
interface ingredientsResponse {
    success: boolean;
    data: {
        ingredientID: number;
        ingredientName: string;
    }[];
}
interface typesResponse {
    success: boolean;
    data: {
        typeID: number;
        typeName: string;
    }[];
}
interface dishResponse {
    success: boolean;
    data: {
        dishID: number;
        dishName: string;
        summary: string;
        url: string;
        ingredients: string;
        types: string;
        rating: number;
        preRating: number;
        preRatingTime: string|null;
        isRated: boolean;
    }[];
}
interface detailDishResponse {
    success: boolean;
    data: {
        dishID: number;
        dishName: string;
        summary: string;
        url: string;
        ingredients: string;
        types: string;
        rating: number;
        preRating: number;
        preRatingTime: string|null;
        isRated: boolean;
        content: string;
    };
}
@Injectable({providedIn: 'root'})
export class DishService {

    dishSubject$ = new BehaviorSubject<Dish[]>([]);
    ingredientSubject$ = new BehaviorSubject<KeyValue<string,string>[]>([]);
    typesSubject$ = new BehaviorSubject<KeyValue<string,string>[]>([]);
    errorSubject$ = new Subject<string>();
    dishSelected$ = new Subject<Dish>();

    constructor(private httpClient: HttpClient,private authService: AuthService) {
        
    }

    getDishes(query: string, filterIngredients: number[] = [], filterTypes: number[] = [], offset: number = 0, itemsPerPage: number = 5) {
        const dishRequest: dishRequest = {
            search: query,
            ingredients: filterIngredients,
            types: filterTypes,
            itemsPerPage: itemsPerPage,
            offset: offset
        };
        this.httpClient.post<dishResponse>(config.serverUrl +'dish', dishRequest).subscribe(
            (response) => {
                const dishes:Dish[] = response.data.map((item) => {
                    const ingredients = item.ingredients.split(',').map((ingredient) => {
                        return new Ingredient("",ingredient,0,"gram");
                    });
                    const types = item.types.split(',').map((type) => {
                        return new TypeDish("",type);
                    });
                    let rating = item.isRated?item.rating:item.preRating;
                    rating = Math.round(rating*10);
                    return new Dish(item.dishID.toString(), item.dishName, item.summary, item.url, ingredients, types, rating, item.isRated);
                });
                this.dishSubject$.next(dishes);
                this.getDeailtDish(dishes[0].getID());
                this.errorSubject$.next('');
            },
            (error) => {
                if(error.status === 403){
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
        this.httpClient.get<ingredientsResponse>(config.serverUrl +'dish/ingredients').subscribe(
            (response) => {
                const data = response.data.map((item) => {
                    return {key: item.ingredientID.toString(), value: item.ingredientName};
                });
                this.ingredientSubject$.next(data);
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

    getTypes(){
        this.httpClient.get<typesResponse>(config.serverUrl +'dish/types').subscribe(
            (response) => {
                const data = response.data.map((item) => {
                    return {key: item.typeID.toString(), value: item.typeName};
                });
                this.typesSubject$.next(data);
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

    setSelectedDish(dish: Dish){
        this.dishSelected$.next(dish);
    }

    getDeailtDish(dishID: string){
        // http://localhost:3001/api/v1/dish?id=32df3g4df6df3gdf34
        this.httpClient.get<detailDishResponse>(config.serverUrl +'dish?id='+dishID).subscribe(
            (response) => {
                const item = response.data;
                const ingredients = item.ingredients.split(',').map((ingredient) => {
                    const array = ingredient.split('@');
                    return new Ingredient("",array[0],Number(array[1]),array[2]);
                });
                const types = item.types.split(',').map((type) => {
                    return new TypeDish("",type);
                });
                let rating = item.isRated?item.rating:item.preRating;
                rating = Math.round(rating*10);
                const dish = new Dish(item.dishID.toString(), item.dishName, item.summary, item.url, ingredients, types, rating, item.isRated);
                dish.setRecipe(item.content);
                console.log(dish);
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
}