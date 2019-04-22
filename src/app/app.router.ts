import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';

export const router: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full'},
    { path: 'landing', component: LandingComponent},
    { path: 'register', component: RegisterComponent},
    { path : 'main', component: MainComponent },
    { path : 'navbar', component: NavbarComponent}

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

