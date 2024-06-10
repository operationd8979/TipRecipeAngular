import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { errorMessage, message } from 'src/app/constants';
import { User } from 'src/app/models/user.model';
import { AuthService, ToastService } from 'src/app/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup = new FormGroup({});
    userSubscription: Subscription = new Subscription();
    errorSubscription: Subscription = new Subscription();

    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

    ngOnInit(): void {
        this.userSubscription = this.authService.user$.subscribe(
            (user:User|null) => {
                if (user) {
                    this.toastService.showSuccess(message.MESSAGE_LOGIN_SUCCESS);
                    this.router.navigate(['/']);
                }
            },
        );
        this.errorSubscription = this.authService.errorObservable$.subscribe(
            (error) => {
                this.errorMessage = error;
                this.toastService.showError(error);
            },
        );
        this.loginForm = new FormGroup({
            email: new FormControl('operationddd@gmail.com', [Validators.required, Validators.email]),
            password: new FormControl('Mashiro1', [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    onSubmit() {
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password);
    }

    checkChain(control: any) {
        if (control.touched) {
            if (control.errors) {
                if (control.errors['required']) {
                    return errorMessage.MESSAGE_REQUIRED;
                }
                if (control.errors['email']) {
                    return errorMessage.MESSAGE_EMAIL_INVALID;
                }
                if (control.errors['minlength']) {
                    return errorMessage.MESSAGE_PASSWORD_MIN_LENGTH;
                }
            }
        }
        return '';
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }
}
