import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../../../services/auth.service';

export class User{
    email: string;
    password: string;
}


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', './../auth.css']
})
export class LoginComponent implements OnInit {

    model: any = {};
    returnUrl: string;
    message: string = this.authService.message;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        // this.authService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    /**
     * Calls service to log in user
     */
    login() {

        const response = this.authService.login(this.model.email, this.model.password);

        if (!response) {
          return 'No Response';
        }

        response.subscribe( resp => {
            if (resp.status === 'success') {
                this.router.navigate([this.returnUrl]);
            } else {
                this.router.navigate(['/auth/login/']);
                this.message = resp.message;
            }
        });
    }
}
