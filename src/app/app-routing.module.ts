import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailDish, ErrorPage, Home, Login, Register, UserProfile } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'index', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: Home },
  { path: 'detail/:id', component: DetailDish},
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'profile', component: UserProfile},
  { path: '**', component: ErrorPage, data: {message: 'Page not found!'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
