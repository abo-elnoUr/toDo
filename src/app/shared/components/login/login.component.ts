import { Router } from '@angular/router';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted : boolean = false;
  userData : User[] = [];
  err : string = '';

  constructor(private _AuthService:AuthService, private _Router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm : NgForm)
  {
    if (loginForm.valid) {
      this.submitted = true;
      this._AuthService.login(loginForm.value.email, loginForm.value.password).subscribe(() => {
          this._Router.navigate(['/']);

      }, err => {
        console.log(err);
        this.err = err;
        this._Router.navigate(['/login']);
      })
    }

      this.err = 'username or password wrong';
    loginForm.reset();
  }



}
