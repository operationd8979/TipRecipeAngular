import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  DetailDish, DishManager, ErrorPage, Home, Login, Register, UserProfile } from './pages';
import { AuthGuard } from './services';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'index', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: Home , canActivate: [AuthGuard]},
  { path: 'detail/:id', component: DetailDish, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfile, canActivate: [AuthGuard]},
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: '**', component: ErrorPage, data: {message: 'Page not found!'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
