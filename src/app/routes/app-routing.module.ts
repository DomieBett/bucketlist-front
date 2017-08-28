import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './../app.component';
import { RegisterComponent } from './../components/auth/register/register.component';
import { LoginComponent } from './../components/auth/login/login.component';
import { BucketlistComponent } from './../components/bucketlists/bucketlists.component';
import { BucketItemsComponent } from './../components/bucketlists/bucket-items/bucket-items.component';


const routes: Routes = [
    {
        path: '', redirectTo: '/bucketlists', pathMatch: 'full'
    },
    { 
        path: 'auth',
        children: [
            {   path: 'login', component: LoginComponent },
            {   path: 'register',   component: RegisterComponent }
        ]
    },
    {
        path: 'bucketlists',
        children: [
            {   path: '', component: BucketlistComponent },
            {   
                path: ':id',
                children: [
                    {   path: 'items', component: BucketItemsComponent }
                ]
             }
        ]
    },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
