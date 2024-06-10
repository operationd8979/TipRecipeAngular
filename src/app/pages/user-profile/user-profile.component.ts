import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { errorMessage, message } from 'src/app/constants';
import { User } from 'src/app/models/user.model';
import { AuthService, ToastService } from 'src/app/services';

interface Payload {
  [key: string]: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy{

  updateForm: FormGroup = new FormGroup({});
  userSubscription: Subscription = new Subscription();
  errorSubscription: Subscription = new Subscription();

  isUpdate: boolean = false;

  newPassword: string = '';
  errorMessage: string = '';

  user : User|null = null;

  getPayload(): Payload {
    return {
      "Username": this.user?.getUsername() || "",
      "Email": this.user?.getEmail() || "",
      "Role": this.user?.getRole() || "",
    };
  }
  
  constructor(private authService:AuthService,private toastService:ToastService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      if(this.isUpdate){
        this.toastService.showSuccess(message.MESSAGE_UPDATE_SUCCESS);
        this.isUpdate = false;
      }
      this.user = user;
      this.updateForm.patchValue({
        "username": user?.getUsername(),
        "email": user?.getEmail(),
      });
    });
    this.errorSubscription = this.authService.errorObservable$.subscribe((error) => {
      this.errorMessage = error;
      this.toastService.showError(error);
    });
    this.updateForm = new FormGroup({
      "username": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "newPassword": new FormControl(""),
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  onSubmit(){
    this.isUpdate = true;
    const {username, email, newPassword} = this.updateForm.value;
    this.authService.updateProfile(username, newPassword);
    this.updateForm.patchValue({
      "newPassword": "",
    });
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
      }
    }
    return "";
  }

  getErrorNoChange(){
    if(this.isNoChange()){
      return "No changes detected";
    }
    return "";
  }

  isNoChange(){
    const email = this.user?.getEmail();
    const username = this.user?.getUsername();
    return this.updateForm.get("email")?.value === email && this.updateForm.get("username")?.value === username && this.updateForm.get("newPassword")?.value === "";
  }

}
