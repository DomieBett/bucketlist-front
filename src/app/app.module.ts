import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './router/app-routing.module'

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BucketlistComponent } from './bucketlists/bucketlists.component';
import { BucketlistsComponent } from './bucketlists/bucketlist/bucketlist.component'
import { BucketlistItemsComponent } from './bucketlists/bucketlist-items/bucketlist-items.component';
import { BucketlistsService } from './bucketlists/services/bucketlists.service';
import { BucketlistItemsService } from './bucketlists/services/bucketlist-items.service';
import { AuthService } from './auth/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    BucketlistComponent,
    BucketlistsComponent,
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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
