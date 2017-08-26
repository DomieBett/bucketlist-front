import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './routes/app-routing.module'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BucketlistComponent } from './components/bucketlists/bucketlists.component';
import { BucketlistItemsComponent } from './components/bucketlists/bucketlist-items/bucketlist-items.component';

import { BucketlistsService } from './services/bucketlists.service';
import { BucketlistItemsService } from './services/bucketlist-items.service';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.services';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BucketlistComponent,
    BucketlistItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    HttpClient,
    BucketlistsService,
    BucketlistItemsService,
    AuthService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
