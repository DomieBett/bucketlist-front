import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './../auth/auth.component';
import { AppComponent } from './../app.component';
import { RegisterComponent } from './../auth/register/register.component';
import { LoginComponent } from './../auth/login/login.component';
import { BucketlistComponent } from './../bucketlists/bucketlists.component';
import { BucketlistsComponent } from './../bucketlists/bucketlist/bucketlist.component';
import { BucketlistItemsComponent } from './../bucketlists/bucketlist-items/bucketlist-items.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/bucketlists',
        pathMatch: 'full'
    },
    { 
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            }
        ]
    },
    {
        path: 'bucketlists',
        children: [
            {
                path: '',
                component: BucketlistComponent
            },
            {
                path: ':id',
                children:[
                    {
                        path: '',
                        component: BucketlistsComponent
                    },
                    {
                        path: 'items',
                        children:[
                            {
                                path: '',
                                component: BucketlistItemsComponent
                            },
                            {
                                path: ':id',
                                component: BucketlistItemsComponent,
                            }
                        ]
                    }
                ]
            },
        ]
    },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
