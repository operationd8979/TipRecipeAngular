import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header, Footer } from './layout';
import { Home, Login, Register, UserProfile, DetailDish, ErrorPage } from './pages';
import {  TextBox, PlainTextCard, DishList, DishItem, DishQuickView } from './shared';
import { AuthService, HttpInterceptorService } from './services';
import { AdminModule } from './admin/admin.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
      TextBox,
      PlainTextCard,
      DishList,
      DishItem,
      DishQuickView,
      ErrorPage,
    ],
    bootstrap: [AppComponent], 
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      AdminModule
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
      },
      provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
