import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // userPassword: string = '';
  // userEmail: string = '';
  //
  // /**
  //  * Constructor for the email system component
  //  * @param http
  //  */
  // constructor(
  //   private http: HttpClient
  // ) {}

  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    console.log(this.authService.userValue);
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/user/profile']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit():void{
    this.submitted = true;

    // reset alert on submit
    this.error = '';

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.f['username'].value, this.f['password'].value).pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = '/user/profile'; // this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          console.log(this.authService.userValue);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

}
