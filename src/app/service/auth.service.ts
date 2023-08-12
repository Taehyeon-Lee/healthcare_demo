import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

/**
 * Authentication Service for login and logout and able other components to access the login user
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();

  }

  /**
   * getter for the current user
   */
  public get userValue() {
    return this.userSubject.value;
  }


  /**
   * Register a user
   * @param user
   */
  register(user: User){
    return this.http.post(`http://localhost:3000/registerUser`, user);
  }

  /**
   * Login a user
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    return this.http.post<User>(`http://localhost:3000/login`, { u_name: username,
                                                                          u_password: password })
      .pipe(map(user => {
          console.log('User data after login:', user);
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }));
  }

  /**
   * Logout a user
   */
  logout(){
    // remove user from local storage and set cur user to null
    localStorage.removeItem('user');
    this.userSubject.next(null!);
    this.router.navigate(['/login']);
  }
}
