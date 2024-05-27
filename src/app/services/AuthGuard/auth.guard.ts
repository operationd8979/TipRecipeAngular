import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
import {  map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): any {
    return this.authService.user$.pipe(
        map(user => {
          if (user) {
              return true;
          } else {
              return this.router.createUrlTree(['/login']);
          }
        }
    ));
  }
}
