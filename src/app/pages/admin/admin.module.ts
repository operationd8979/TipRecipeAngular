import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { Admin, DashBoard, DishManager, DishModify } from '.';
import { AdminSide } from 'src/app/layout';
import { FormsModule } from '@angular/forms';
import { DishModifyComponent } from './dish-modify/dish-modify.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { Button, TagInput, TagItem } from 'src/app/shared';
import { ShortenPipe } from 'src/app/pipes';

@NgModule({
  declarations: [
    Admin,
    DishManager,
    DashBoard,
    AdminSide,
    DishModify,
    DishModifyComponent,
    TagInput,
    TagItem,
    ShortenPipe,
    Button
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    EditorModule,
  ],
  exports: [
    TagInput,
    TagItem,
    ShortenPipe,
    Button
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AdminModule {}
