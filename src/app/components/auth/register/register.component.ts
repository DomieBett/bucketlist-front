import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css', './../auth.css']
})
export class RegisterComponent implements OnInit {

    model: any = {};
    message: string = this.authService.message;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() { }

    /**
     * Calls service to register user.
     */
    register() {

        // Registers user. Calls register service.
        const response = this.authService.register(this.model.name, this.model.email, this.model.password);

        if (!response) {
          return ('No response');
        }

        response.subscribe(
            resp => {
                this.router.navigate(['/auth/login']);
        });
    }

}
