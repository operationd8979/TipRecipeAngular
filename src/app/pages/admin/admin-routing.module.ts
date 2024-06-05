import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin, DashBoard, DishManager, DishModify } from '.';
import { AuthGuard } from 'src/app/services';

const routes: Routes = [
  {
    path: '',
    component: Admin,
    canActivate: [AuthGuard],
    children: [
      { path: 'dishManager', component: DishManager, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashBoard, canActivate: [AuthGuard] },
      { path: 'modify/:id', component: DishModify, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
