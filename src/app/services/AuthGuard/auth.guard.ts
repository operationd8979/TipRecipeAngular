import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
import {  map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  ADMINURLS = ['/admin'];

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.user$.pipe(
        map(user => {
          if (user) {
            if(this.ADMINURLS.some(url => state.url.includes(url))){
              if(user.getRole().includes("ADMIN")){
                return true;
              }
              return this.router.createUrlTree(['/unauthorized']);
            }
            return true;
          } else {
            return this.router.createUrlTree(['/login']);
          }
        }
    ));
  }
}
