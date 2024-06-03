import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { Admin, DashBoard, DishManager } from '.';
import { AdminSide } from 'src/app/layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Admin,
    DishManager,
    DashBoard,
    AdminSide
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule {}
