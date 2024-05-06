import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSubscription: Subscription = new Subscription();
  user : User|null = null;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject$.subscribe(user => {
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
