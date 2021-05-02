import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo';
  constructor(private _AuthService:AuthService)
  {

  }
  ngOnInit()
  {
    this._AuthService.autoLogin();
  }
}
