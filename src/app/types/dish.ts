import { Ingredient } from "./ingredient";
import { TypeDish } from "./type";

export interface Dish {
    dishID: string,
    dishName: string,
    summary: string,
    url: string,
    ingredients: Ingredient[],
    type: TypeDish[],
    rating: number,
}