import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'yourBucky';
  user_name: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit() {
    this.user_name = this.user.getName();
  }

	/**
	 * Logs the user out
	 */
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
