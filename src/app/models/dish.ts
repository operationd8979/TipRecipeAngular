import { Ingredient } from "./ingredient";
import { TypeDish } from "./type";

export class Dish {
    private id: string;
    private name: string;
    private summary: string;
    private url: string;
    private ingredients: Ingredient[];
    private types: TypeDish[];
    private rating: number;
    private recipe: string = "";


    public constructor(dishID: string, dishName: string, summary: string, url: string, ingredients: Ingredient[], types: TypeDish[], rating: number) {
        this.id = dishID;
        this.name = dishName;
        this.summary = summary;
        this.url = url;
        this.ingredients = ingredients;
        this.types = types;
        this.rating = rating;
    }

    public setRecipe(recipe: string): void {
        this.recipe = recipe;
    }

    public getID(): string {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }

    public getSummary(): string {
        return this.summary;
    }

    public getUrl(): string {
        return this.url;
    }

    public getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    public getTypes(): TypeDish[] {
        return this.types.slice();
    }

    public getRating(): number {
        return this.rating;
    }

    public getRecipe(): string {
        return this.recipe;
    }

}