import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService, LoadingService } from 'src/app/services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoading = false;

  userSubscription: Subscription = new Subscription();
  loadingSubscription: Subscription = new Subscription();
  user : User|null = null;


  constructor(private authService:AuthService,private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
    this.userSubscription = this.authService.user$.subscribe(user => {
      if(user){
        this.user = user;
      }
      else{
        this.user = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }

}
