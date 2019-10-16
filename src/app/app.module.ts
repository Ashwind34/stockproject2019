import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.router';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { FavService } from './services/fav.service';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FavtableComponent } from './favtable/favtable.component';
import { QuotetableComponent } from './quotetable/quotetable.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    LandingComponent,
    NavbarComponent,
    FavtableComponent,
    QuotetableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    routes
  ],
  providers: [ApiService, UserService, FavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
