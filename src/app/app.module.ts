import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header, Footer, AdminSide } from './layout';
import { Home, Login, Register, UserProfile, DetailDish, Admin, ErrorPage, DishManager, DashBoard } from './pages';
import { Button, TextBox, PlainTextCard, TagInput, TagItem, DishList, DishItem, DishQuickView } from './shared';
import { AuthService, HttpInterceptorService } from './services';
import { ShortenPipe } from './pipes';

export function initializeApp(authService: AuthService) {
  return (): Promise<void> => {
    return authService.authByToken();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    Header,
    Footer,
    Home,
    Login,
    Register,
    UserProfile,
    DetailDish,
    Button,
    TextBox,
    PlainTextCard,
    TagInput,
    TagItem,
    DishList,
    DishItem,
    DishQuickView,
    ErrorPage,
    ShortenPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorService, 
      multi: true 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
