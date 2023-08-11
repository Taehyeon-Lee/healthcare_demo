import { Component } from '@angular/core';
import { User } from '../service/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedInUser: User | null;

  constructor(private authService: AuthService) {
    this.loggedInUser = this.authService.userValue;
  }
}
