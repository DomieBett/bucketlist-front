import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './routes/app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BucketlistComponent } from './components/bucketlists/bucketlists.component';
import { BucketItemsComponent } from './components/bucketlists/bucket-items/bucket-items.component';
import { ModalComponent } from './directives/modal.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorComponent } from './components/error/error.component';

import { BucketlistsService } from './services/bucketlists.service';
import { BucketItemsService } from './services/bucket-items.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { BucketToolsService } from './services/bucket-tools.service';
import { ModalService } from './services/modal.service';
import { SearchService } from './services/search.service';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BucketlistComponent,
    BucketItemsComponent,
    ModalComponent,
    SearchComponent,
    NavbarComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    HttpClient,
    BucketlistsService,
    BucketItemsService,
    AuthService,
    UserService,
    BucketToolsService,
    ModalService,
    SearchService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
