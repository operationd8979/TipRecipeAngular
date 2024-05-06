export class User {
    private email: string;
    private username: string;
    private role: string;

    public constructor(email: string, username: string, role: string) {
        this.email = email;
        this.username = username;
        this.role = role;
    }


    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getRole(): string {
        return this.role;
    }


}