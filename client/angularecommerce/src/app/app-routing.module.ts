import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'**',
    redirectTo:''

  },
  {
    path:'register',
    component: RegistrationComponent
  },
  {
    path:'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
