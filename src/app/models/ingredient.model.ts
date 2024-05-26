export class Ingredient {
    private id: number;
    private name: string;
    private quantity: number;
    private unit: string;

    constructor(id: number, name: string, quantity: number, unit: string) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    public getID(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getUnit(): string {
        return this.unit;
    }
}