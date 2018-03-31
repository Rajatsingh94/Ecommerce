import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule, NgbDropdown, NgbDropdownConfig, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import {RestApiService} from './rest-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NgbDropdownConfig,NgbCarouselConfig,RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
