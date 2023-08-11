import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../service/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  curUser: User | null;

  constructor(private authService: AuthService,
              private router: Router) {
    this.curUser = this.authService.userValue;
  }


  ngOnInit(): void {
    // Fetch user data from a service (replace 'getUserData' with your method)
    this.curUser = this.authService.userValue;
  }

  logout(): void {
    // Call logout method from your authentication service
    this.authService.logout();
    // Redirect to login page
    this.router.navigate(['/login']);
  }

}
