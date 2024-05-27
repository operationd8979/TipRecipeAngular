import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { errorMessage } from 'src/app/constants';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  userSubscription: Subscription = new Subscription();
  errorSubscription: Subscription = new Subscription();

  errorMessage: string = '';
  registerForm : FormGroup = new FormGroup({});

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user:User|null) => {
      if(user) this.router.navigate(['/']);
    });
    this.errorSubscription = this.authService.errorObservable$.subscribe((error) => {
      this.errorMessage = error;
    });
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.noMatchPassword.bind(this)]),
    });
  }

  onSubmit(){
    const { email, username, password } = this.registerForm.value;
    this.authService.register(email, username, password);
  }

  checkChain(control: any){
    if(control.touched){
      if(control.errors){
        if(control.errors['required']){
          return errorMessage.MESSAGE_REQUIRED;
        }
        if(control.errors['email']){
          return errorMessage.MESSAGE_EMAIL_INVALID;
        }
        if(control.errors['minlength']){
          return errorMessage.MESSAGE_PASSWORD_MIN_LENGTH;
        }
        if(control.errors['noMatch']){
          return errorMessage.MESSAGE_NO_MATCH_PASSWORD;
        }
      }
    }
    return "";
  }

  noMatchPassword(control: FormControl) : {[s: string]: boolean} {
    if(control.value !== this.registerForm.get('password')?.value){
      return {'noMatch': true};
    }
    return {};
  }

  ngOnDestroy(): void {
  }

}
