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
import { BucketItemsComponent } from './components/bucketlists/bucket-items/bucket-items.component';

import { BucketlistsService } from './services/bucketlists.service';
import { BucketlistItemsService } from './services/bucketlist-items.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { BucketToolsService } from './services/bucket-tools.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BucketlistComponent,
    BucketItemsComponent
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
    UserService,
    BucketToolsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
