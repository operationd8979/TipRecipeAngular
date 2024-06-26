import { KeyValue } from "@angular/common";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, finalize } from "rxjs";
import { AuthService } from "../AuthService";
import { config } from 'src/app/constants';
import { Dish, Ingredient, TypeDish } from "src/app/models";
import { LoadingService } from "../LoadingService";

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
    isDeleted: boolean;
}
interface dishesAdmin{
    dishes: dishResponse[];
    total: number;
}
@Injectable({providedIn: 'root'})
export class DishService {

    private dishSubject$ = new BehaviorSubject<Dish[]>([]);
    dishesObservable$ = this.dishSubject$.asObservable();
    private dishAdminSubject$ = new BehaviorSubject<{dishes: Dish[], total: number}>({dishes: [], total: 0});
    dishesAdminObservable$ = this.dishAdminSubject$.asObservable();
    private ingredientSubject$ = new BehaviorSubject<KeyValue<number,string>[]>([]);
    ingredientsObservable$ = this.ingredientSubject$.asObservable();
    private typeSubject$ = new BehaviorSubject<KeyValue<number,string>[]>([]);
    typesObservable$ = this.typeSubject$.asObservable();
    private errorSubject$ = new Subject<string>();
    errorObserable$ = this.errorSubject$.asObservable();
    dishSelected$ = new Subject<Dish>();
    dishSelectedObservable$ = this.dishSelected$.asObservable();
    private recommendDishSubject$ = new BehaviorSubject<KeyValue<string,string>[]>([]);
    recommendDishesObservable$ = this.recommendDishSubject$.asObservable();

    constructor(private httpClient: HttpClient,private loadingService: LoadingService) {
        
    }

    getDishes(query: string, filterIngredients: number[] = [], filterTypes: number[] = [], offset: number = 0, itemsPerPage: number = 5) {
        this.loadingService.show();
        const queryParams = new HttpParams()
            .set('query', query)
            .set('ingredients', filterIngredients.join(','))
            .set('types', filterTypes.join(','))
            .set('limit', itemsPerPage)
            .set('offset', offset);
        this.httpClient.get<dishResponse[]>(config.serverUrl +'dish', {params: queryParams})
        .pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        )
        .subscribe(
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
                if(dishes.length > 0){
                    this.getDeailtDish(dishes[0].getID());
                }
                this.errorSubject$.next('');
            },
            (error) => {
                this.dishSubject$.next([]);
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            },
        );
        
    }

    getRecommendDishes() {
        this.httpClient.get<dishResponse[]>(config.serverUrl +'dish/recommend')
        .subscribe(
            (response) => {
                const items:KeyValue<string,string>[] = response.map((item) => {
                    return {key: item.dishID, value: item.urlPhoto};
                });
                this.recommendDishSubject$.next(items);
                this.errorSubject$.next('');
            },
            (error) => {
                this.dishSubject$.next([]);
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            },
        );
        
    }

    getDishesByAdmin(query: string, offset: number = 0, itemsPerPage: number = 5) {
        this.loadingService.show();
        const queryParams = new HttpParams()
            .set('query', query)
            .set('limit', itemsPerPage)
            .set('offset', offset);
        this.httpClient.get<dishesAdmin>(config.serverUrl +'admin/dish', {params: queryParams})
        .pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        )
        .subscribe(
            (response) => {
                const dishes:Dish[] = response.dishes.map((item) => {
                    const ingredients = item.detailIngredientDishes.map((ingredient) => {
                        return new Ingredient(ingredient.ingredient.ingredientId,ingredient.ingredient.ingredientName,ingredient.amount,ingredient.unit);
                    });
                    const types = item.detailTypeDishes.map((type) => {
                        return new TypeDish(type.type.typeID,type.type.typeName);
                    });
                    let dish: Dish = new Dish(item.dishID, item.dishName, item.summary, item.urlPhoto, ingredients, types, item.ratingScore, item.isRated);
                    dish.setIsDeleted(item.isDeleted);
                    return dish;
                });
                this.dishAdminSubject$.next({dishes: dishes, total: response.total});
                this.errorSubject$.next('');
            },
            (error) => {
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
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            },
        );
    }

    setSelectedDish(dish: Dish){
        this.dishSelected$.next(dish);
    }

    transalteDishResponse(dish: dishResponse):Dish{
        const ingredients = dish.detailIngredientDishes.map((ingredient) => {
            return new Ingredient(ingredient.ingredient.ingredientId,ingredient.ingredient.ingredientName,ingredient.amount,ingredient.unit);
        });
        const types = dish.detailTypeDishes.map((type) => {
            return new TypeDish(type.type.typeID,type.type.typeName);
        });
        const tempDish = new Dish(dish.dishID, dish.dishName, dish.summary, dish.urlPhoto, ingredients, types, dish.ratingScore, dish.isRated);
        tempDish.setRecipe(dish.recipe.content);
        return tempDish;
    }

    getDeailtDish(dishID: string){
        this.httpClient.get<dishResponse>(config.serverUrl +'dish/'+dishID)
        .subscribe(
            (response) => {
                const dish = this.transalteDishResponse(response);
                this.dishSelected$.next(dish);
                this.errorSubject$.next('');
            },
            (error) => {
                const errorMessage = error.error.message;
                this.errorSubject$.next(errorMessage);
            }
        );
    }

    rateDish(dishID: string, rating: number): Observable<HttpResponse<any>>{
        this.loadingService.show();
        const body = {
            dishID: dishID,
            ratingScore: rating
        };
        return this.httpClient.post(config.serverUrl +'dish/rating', body, {observe: 'response'})
        .pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }

    
    modifyVisibleDish(dishID:string) : Observable<HttpResponse<any>>{
        this.loadingService.show();
        return this.httpClient.delete(
            config.serverUrl + "admin/" + dishID,
            {
                observe: 'response' 
            }
        ).pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }

    postAddDish(
        dishName:string,
        summary:string,
        detailIngredientDishes: {Ingredient:{IngredientId:number,IngredientName:string},Amount:number,Unit:string}[],
        detailTypeDishes: {Type:{TypeID:number,TypeName:string}}[],
        recipe: {Content: string},
        imageBlob: Blob | null
    ): Observable<HttpResponse<any>> {
        this.loadingService.show();
        const formData = new FormData();
        if(imageBlob){
            formData.append('file', imageBlob, 'testSample.jpg');
        }
        formData.append('dishName', dishName);
        formData.append('summary', summary);
        formData.append('detailIngredientDishes', JSON.stringify(detailIngredientDishes));
        formData.append('detailTypeDishes', JSON.stringify(detailTypeDishes));
        formData.append('recipe', JSON.stringify(recipe));
        return this.httpClient.post<dishResponse>('http://localhost:8080/api/admin/dish', formData, {observe: 'response'})
        .pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }

    postUpdateDish(
        dishID:string,
        dishName:string,
        summary:string,
        detailIngredientDishes: {Ingredient:{IngredientId:number,IngredientName:string},Amount:number,Unit:string}[],
        detailTypeDishes: {Type:{TypeID:number,TypeName:string}}[],
        recipe: {Content: string},
        imageBlob: Blob | null
    ): Observable<HttpResponse<any>> {
        this.loadingService.show();
        const formData = new FormData();
        if(imageBlob){
            formData.append('file', imageBlob, 'testSample.jpg');
        }
        formData.append('dishName', dishName);
        formData.append('summary', summary);
        formData.append('detailIngredientDishes', JSON.stringify(detailIngredientDishes));
        formData.append('detailTypeDishes', JSON.stringify(detailTypeDishes));
        formData.append('recipe', JSON.stringify(recipe));
        return this.httpClient.put<dishResponse>(`http://localhost:8080/api/admin/dish/${dishID}`, formData, {observe: 'response'})
        .pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }

}