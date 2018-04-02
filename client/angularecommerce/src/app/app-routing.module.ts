import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { AuthguardService} from './authguard.service';

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
    component: RegistrationComponent,
    canActivate:[AuthguardService]
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
