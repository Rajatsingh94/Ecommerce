import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { AuthguardService} from './authguard.service';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {AddressComponent} from './address/address.component';
import {CategoriesComponent} from './categories/categories.component';
import { PostProductComponent } from './post-product/post-product.component';


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
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [AuthguardService]
  },
  {
    path:'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthguardService]
  },
  {
    path:'profile/address',
    component: AddressComponent,
    canActivate: [AuthguardService]
  },
  {
    path:'categories',
    component: CategoriesComponent,
    canActivate: [AuthguardService]
  },
  {
    path:'profile/postproducts',
    component: PostProductComponent,
    canActivate: [AuthguardService]
  }



  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
