import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(loginForm : NgForm)
  {
    if (loginForm.valid) {
      this.submitted = true;
      console.log(loginForm.value)
    }
  }

}
