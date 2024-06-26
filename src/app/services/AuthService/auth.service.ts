import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/constants';
import { lastValueFrom, BehaviorSubject, Subject, map, take, Observable, finalize } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { LoadingService } from '../LoadingService';

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
    private userSubject$ = new BehaviorSubject<User|null>(null);
    public user$ = this.userSubject$.asObservable();
    private errorSubject$ = new Subject<string>();
    public errorObservable$ = this.errorSubject$.asObservable();

    constructor(private httpClient: HttpClient,private router: Router,private loadingService: LoadingService) {
    }

    authByToken(): Promise<void> {
        this.loadingService.show();
        return new Promise((resolve, reject) => {
          this.httpClient.get<authResponse>(config.serverUrl + 'auth')
            .pipe(
                    finalize(() => {
                        this.loadingService.hide();
                    })
                )
            .subscribe(
                (response) => {
                    const { email, userName, role } = response;
                    const user = new User(email, userName, role);
                    this.userSubject$.next(user);
                    resolve();
                },
                (error) => {
                    resolve(); 
                }
            );
        });
      }

    login(email: string, password: string) {
        this.loadingService.show();
        const loginRequest: LoginRequest = { email, password };
        this.httpClient
            .post<authResponse>(config.serverUrl + 'auth/login', loginRequest)
            .pipe(
                finalize(() => {
                    this.loadingService.hide();
                })
            )
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
        this.loadingService.show();
        const registerRequest: RegisterRequest = { email, username, password };
        this.httpClient
            .post<authResponse>(config.serverUrl + 'auth/register', registerRequest)
            .pipe(
                finalize(() => {
                    this.loadingService.hide();
                })
            )
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
        this.loadingService.show();
        const updateRequest:UpdateRequest = { username, newPassword: newPassword };
        this.httpClient
            .post<authResponse>(config.serverUrl + 'auth/update', updateRequest)
            .pipe(
                finalize(() => {
                    this.loadingService.hide();
                })
            )
            .subscribe(
                (response) => {
                    const { email, userName, role } = response;
                    const user = new User(email, userName, role);
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
                this.userSubject$.next(null);
                this.router.navigate(['/login']);
            },
            (error) => {
                console.log(error);
            },
        );
    }

}
