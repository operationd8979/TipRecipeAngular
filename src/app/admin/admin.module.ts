import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { Admin, DashBoard, DishManager, DishModify } from '.';
import { AdminSide } from 'src/app/layout';
import { FormsModule } from '@angular/forms';
import { DishModifyComponent } from './dish-modify/dish-modify.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { Button, TagInput, TagItem, ToastComponent } from 'src/app/shared';
import { ShortenPipe } from 'src/app/pipes';
import { AuthService } from '../services';


// export function initializeApp(authService: AuthService) {
//   return (): Promise<void> => {
//     return authService.authByToken();
//   };
// }

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
    Button,
    ToastComponent
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
    Button,
    ToastComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeApp,
    //   deps: [AuthService],
    //   multi: true
    // }
  ],
})
export class AdminModule {}
