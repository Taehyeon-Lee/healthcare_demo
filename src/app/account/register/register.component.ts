import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      u_name: ['', Validators.required],
      u_password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  /**
   * On submit of the form, the form is validated and if valid, the user is registered
   */
  onSubmit():void{
    this.submitted = true;

    // reset alert on submit
    this.error = '';

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    // Register the user by calling register method of the auth service
    this.authService.register(this.form.value).pipe(first())
      .subscribe({
        next: () => {
          // once registered, the user is redirected to the login page to login
          this.router.navigate(['/login'], { queryParams: {registered: true }});
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
