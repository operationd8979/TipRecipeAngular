export class TypeDish{
    private id: string;
    private name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    public getID(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}