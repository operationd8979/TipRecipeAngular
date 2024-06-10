import { Ingredient } from "./ingredient.model";
import { TypeDish } from "./type.model";

export class Dish {
    private id: string;
    private name: string;
    private summary: string;
    private url: string;
    private ingredients: Ingredient[];
    private types: TypeDish[];
    private rating: number;
    private isRated: boolean = false;
    private isDeleted: boolean = false;
    private recipe: string = "";


    public constructor(dishID: string, dishName: string, summary: string, url: string, ingredients: Ingredient[], types: TypeDish[], rating: number, isRated: boolean = false) {
        this.id = dishID;
        this.name = dishName;
        this.summary = summary;
        this.url = url;
        this.ingredients = ingredients;
        this.types = types;
        this.rating = rating;
        this.isRated = isRated;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }
    
    public setIngredients(ingredients: Ingredient[]): void {
        this.ingredients = ingredients;
    }

    public setRecipe(recipe: string): void {
        this.recipe = recipe;
    }

    public setIsDeleted(isDeleted: boolean): void {
        this.isDeleted = isDeleted;
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

    public getIngredientNames(): string {
        return this.ingredients.map(ingredient => ingredient.getName()).join(", ");
    }

    public getTypes(): TypeDish[] {
        return this.types.slice();
    }

    public getTypeNames(): string {
        return this.types.map(type => type.getName()).join(", ");
    }

    public getRating(): number {
        return this.rating;
    }

    public getRecipe(): string {
        return this.recipe;
    }

    public getIsRated(): boolean {
        return this.isRated;
    }

    public getIsDeleted(): boolean {
        return this.isDeleted;
    }

}