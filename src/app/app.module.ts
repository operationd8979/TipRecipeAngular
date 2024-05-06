import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header, Footer } from './layout';
import { Home, Login, Register, UserProfile, DetailDish, ErrorPage } from './pages';
import { Button, TextBox, PlainTextCard, TagInput, TagItem, DishList, DishItem, DishQuickView } from './shared';
import { HttpInterceptorService } from './services';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
