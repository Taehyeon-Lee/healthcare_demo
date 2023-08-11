import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent, RegisterComponent} from "./account/";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'}, // default route
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'user/profile', component: ProfileComponent, pathMatch: 'full'},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
