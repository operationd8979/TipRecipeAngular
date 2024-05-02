import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header, Footer } from './layout';
import { Home, Login, Register, UserProfile, DetailDish } from './pages';
import { Button, TextBox, PlainTextCard, TagInput, TagItem, DishList, DishItem, DishQuickView } from './shared';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
