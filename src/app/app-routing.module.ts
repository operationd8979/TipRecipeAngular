import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailDish, Home, Login, Register, UserProfile } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'index', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: Home },
  { path: 'detail/:id', component: DetailDish},
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'profile', component: UserProfile},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
