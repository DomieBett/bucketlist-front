import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './../app.component';
import { RegisterComponent } from './../components/auth/register/register.component';
import { LoginComponent } from './../components/auth/login/login.component';
import { BucketlistComponent } from './../components/bucketlists/bucketlists.component';
import { BucketItemsComponent } from './../components/bucketlists/bucket-items/bucket-items.component';
import { ErrorComponent } from './../components/error/error.component';


const routes: Routes = [
    {
        path: '', redirectTo: 'bucketlists', pathMatch: 'full'
    },
    {
        path: 'auth/login', component: LoginComponent
    },
    {
        path: 'auth/register', component: RegisterComponent
    },
    {
        path: 'bucketlists', component: BucketlistComponent
    },
    {
        path: 'bucketlists/:id/items', component: BucketItemsComponent
    },
    {
        path: 'error/:status', component: ErrorComponent
    },
    {
        path: '**', redirectTo: '/error/404'
    },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
