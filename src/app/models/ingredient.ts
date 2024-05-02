export class Ingredient {
    private id: string;
    private name: string;
    private quantity: number;
    private unit: string;

    constructor(id: string, name: string, quantity: number, unit: string) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    public getID(): string {
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