import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home, Login, Register } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'index', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: Home },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
