import { Router } from '@angular/router';
import { UserModel } from './../../shared/components/login/userModel';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<any>(null);

  get isAuth()
  {
    return localStorage.getItem('userData') ? true : false;
  }

  private credentials = [{
    email: 'aboelnour@gmail.com',
    password: '123456',
    username: 'aboelnour'
  }]
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
   }

  login(email: string, password: string)
  {
    if(email === this.credentials[0].email && password === this.credentials[0].password)
    {
      const user = new UserModel(email, this.credentials[0].username);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
      return of(this.credentials);
    }
    else
    {
      catchError(this.error);
      return of({});
    }
  }

  autoLogin() {
    const userData: {
      email: string;
      username: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.username,
    );

    if (loadedUser.username) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this._Router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  private error(errorRes: HttpErrorResponse) {
    let errorMsg = 'username or password wrong';
    if (errorRes.error) {
      return throwError(errorMsg);
    }
    return throwError(errorMsg);
  }

}
