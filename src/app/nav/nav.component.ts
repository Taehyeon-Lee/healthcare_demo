import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  loggedIn: boolean = false;

  constructor(private authService: AuthService) {
    if (this.authService.userValue) {
      this.loggedIn = true;
    }
  }

}
