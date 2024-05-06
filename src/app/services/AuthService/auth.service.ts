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
interface authResponse {
    success: boolean;
    data: {
        email: string;
        username: string;
        role: string;
    };
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
        this.httpClient.get<authResponse>(config.serverUrl + 'user/getInfo').subscribe(
            (response) => {
                const { email, username, role } = response.data;
                const user = new User(email, username, role);
                this.userSubject$.next(user);
            },
            (error) => {
                this.userSubject$.next(null);
            },
        );
    }

    login(email: string, password: string) {
        const loginRequest: LoginRequest = { email, password };
        this.httpClient
            .post<authResponse>(config.serverUrl + 'auth/login', loginRequest)
            .subscribe(
                (response) => {
                    const { email, username, role } = response.data;
                    const user = new User(email, username, role);
                    this.userSubject$.next(user);
                },
                (error) => {
                    const errorMessage = error.error.message;
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
                    const { email, username, role } = response.data;
                    const user = new User(email, username, role);
                    this.userSubject$.next(user);
                },
                (error) => {
                    const errorMessage = error.error.message;
                    this.errorSubject$.next(errorMessage);
                },
            );
    }

    logout() {
        this.httpClient.get<logoutResponse>(config.serverUrl + 'auth/logout').subscribe(
            (response) => {
                if(response.success){
                    this.userSubject$.next(null);
                    this.router.navigate(['/login']);
                }
            },
            (error) => {
                alert('Something went wrong');
                console.log(error);
            },
        );
    }

}
