import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/constants';
import { lastValueFrom, BehaviorSubject, Subject, map, take } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

interface LoginRequest {
    email: string;
    password: string;
}
interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}
interface UpdateRequest{
    username: string;
    newPassword: string;
}
interface authResponse {
    email: string;
    userName: string;
    role: string;
}
interface logoutResponse {
    success: boolean;
    data: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    userSubject$ = new BehaviorSubject<User|null>(null);
    errorSubject$ = new Subject<string>();

    constructor(private httpClient: HttpClient,private router: Router) {
       this.authByToken();
    }


    authByToken() {
        this.httpClient.get<authResponse>(config.serverUrl + 'auth').subscribe(
            (response) => {
                const { email, userName, role } = response;
                const user = new User(email, userName, role);
                this.userSubject$.next(user);
            },
            (error) => {
                if(error.status === 401){
                    this.logout();
                    return;
                }
            },
        );
    }

    login(email: string, password: string) {
        const loginRequest: LoginRequest = { email, password };
        this.httpClient
            .post<authResponse>(config.serverUrl + 'auth/login', loginRequest)
            .subscribe(
                (response) => {
                    const { email, userName, role } = response;
                    const user = new User(email, userName, role);
                    this.userSubject$.next(user);
                },
                (error) => {
                    const errorMessage = error.error.message??"Something went wrong";
                    this.errorSubject$.next(errorMessage);
                },
            );
    }

    register(email: string, username: string, password: string) {
        const registerRequest: RegisterRequest = { email, username, password };
        this.httpClient
            .post<authResponse>(config.serverUrl + 'auth/register', registerRequest)
            .subscribe(
                (response) => {
                    const { email, userName, role } = response;
                    const user = new User(email, username, role);
                    this.userSubject$.next(user);
                },
                (error) => {
                    const errorMessage = error.error.message;
                    this.errorSubject$.next(errorMessage);
                },
            );
    }

    updateProfile(username: string, newPassword: string) {
        const updateRequest:UpdateRequest = { username, newPassword: newPassword };
        this.httpClient
            .post<authResponse>(config.serverUrl + 'auth/update', updateRequest)
            .subscribe(
                (response) => {
                    const { email, userName, role } = response;
                    const user = new User(email, userName, role);
                    this.userSubject$.next(user);
                },
                (error) => {
                    if(error.status === 401){
                        this.logout();
                        return;
                    }
                    const errorMessage = error.error.message;
                    this.errorSubject$.next(errorMessage);
                },
            );
    }

    logout() {
        this.httpClient.get<logoutResponse>(config.serverUrl + 'auth/logout').subscribe(
            (response) => {
                this.userSubject$.next(null);
                this.router.navigate(['/login']);
            },
            (error) => {
                console.log(error);
            },
        );
    }

}
