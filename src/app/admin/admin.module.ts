import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { Admin, DashBoard, DishManager, DishModify, BlobManager } from '.';
import { AdminSide } from 'src/app/layout';
import { FormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { Button, TagInput, TagItem, ToastComponent } from 'src/app/shared';
import { ShortenPipe } from 'src/app/pipes';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    Admin,
    BlobManager,
    DishManager,
    DashBoard,
    AdminSide,
    DishModify,
    TagInput,
    TagItem,
    ShortenPipe,
    Button,
    ToastComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    EditorModule,
    FlexLayoutModule
  ],
  exports: [
    TagInput,
    TagItem,
    ShortenPipe,
    Button,
    ToastComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class AdminModule {}
