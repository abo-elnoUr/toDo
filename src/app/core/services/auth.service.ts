import { Router } from '@angular/router';
import { UserModel } from './../../shared/components/login/userModel';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<any>(null);


  private credentials = {
    email: 'aboelnour@gmail.com',
    password: '123456',
    username: 'aboelnour'
  }
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
   }

  login(email: string, password: string)  {
    return this._HttpClient.get<User[]>('http://localhost:3000/user').pipe(map((result) => {
      if (result[0].email === this.credentials.email && result[0].password === this.credentials.password) {
        return result;
      }
      else
      {
        return [];
      }
    }),tap(resData => {
      this.auth(
        resData[0].email,
        resData[0].username,
      );
    }),catchError(this.error))
  }

  private auth(
    email: string,
    username: string,
  ) {
    const user = new UserModel(email, username);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
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
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    return throwError(errorMsg);
  }

}
