export class User {
    private id: string;
    private name: string;
    private email: string;
    private password: string;
    private fullName: string;

    public constructor(userID: string, userName: string, email: string, password: string, fullName: string) {
        this.id = userID;
        this.name = userName;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }

    public getID(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getFullName(): string {
        return this.fullName;
    }

}