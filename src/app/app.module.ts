import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header, Footer } from './layout';
import { Home, Login, Register, UserProfile } from './pages';
import { Button, TextBox, PlainTextCard } from './shared';


@NgModule({
  declarations: [
    AppComponent,
    Header,
    Footer,
    Home,
    Login,
    UserProfile,
    Register,
    Button,
    TextBox,
    PlainTextCard,
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
